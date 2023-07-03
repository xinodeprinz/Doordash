import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

export default Chat;
