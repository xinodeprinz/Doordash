import Errors from "http-errors";
import Chat from "../models/Chat.js";
import { chatSchema } from "../schemas.js";

export const sendMessage = async (req, res, next) => {
  try {
    const value = await chatSchema.validateAsync(req.body);
    value.sender = req.userId;
    const chat = new Chat(value);
    await chat.save();
    return res.json({ message: "Message sent" });
  } catch (err) {
    next(new Errors(422, err));
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ sender: req.userId })
      .sort({ _id: -1 })
      .populate("receiver", ["name", "photo"])
      .lean();

    const uniqueChats = [];

    chats.forEach((chat) => {
      const existingChat = uniqueChats.find(
        (c) => c.receiver._id.toString() === chat.receiver._id.toString()
      );

      if (existingChat) {
        existingChat.count += chat.seen ? 0 : 1;
      } else {
        uniqueChats.push({
          _id: chat._id,
          message: chat.message,
          receiver: chat.receiver,
          count: chat.seen ? 0 : 1,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        });
      }
    });

    return res.json(uniqueChats);
  } catch (err) {
    next(new Errors(500, err));
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: req.userId, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.userId },
      ],
    }).select("-receiver");

    const result = chats.map((chat) => ({
      _id: chat._id,
      message: chat.message,
      type: chat.sender.toString() === req.userId ? "outgoing" : "incoming",
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    return res.json(result);
  } catch (err) {
    next(new Errors(500, err));
  }
};

export const updateChat = async (req, res, next) => {
  try {
    await Chat.findByIdAndUpdate(req.params.id, { seen: true });
    return res.json({ message: "Status updated!" });
  } catch (err) {
    next(new Errors(500, err));
  }
};
