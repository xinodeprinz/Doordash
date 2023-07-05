import Errors from "http-errors";
import User from "../models/User.js";
import { randomString } from "../utils.js";
import bcrypt from "bcrypt";
import { updateUserSchema } from "../schemas.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const { password, ...rest } = user.toObject();
    return res.json(rest);
  } catch (error) {
    next(new Errors(500, "An error occured!"));
  }
};

export const updatePhoto = async (req, res, next) => {
  try {
    const photo = req.files?.photo;
    if (!photo) {
      return next(new Errors(422, "Please upload a photo."));
    }

    // Checking if the uploaded file is an image
    const type = photo.mimetype.split("/").shift();
    if (type !== "image") {
      return next(new Errors(422, "Please upload a photo."));
    }

    const ext = photo.name.split(".").pop();
    const photoName = `profiles/${randomString(50)}.${ext}`;
    photo.mv(`./assets/${photoName}`);
    await User.findByIdAndUpdate(req.userId, { photo: photoName });
    return res.json({ message: "Photo updated!" });
  } catch (error) {
    next(new Errors(500, "An error occured!"));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = await updateUserSchema.validateAsync(req.body);
    if (data?.password) {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
      data.password = bcrypt.hashSync(data.password, salt);
    }
    await User.findByIdAndUpdate(req.userId, data);
    return res.json({ message: "Profile updated!" });
  } catch (err) {
    next(new Errors(422, err));
  }
};

export const popularVendorsInClientsLocation = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.type.toLocaleLowerCase() !== "client") {
      return next(new Errors(403, "Forbidden!"));
    }
    const vendors = await User.where("type", "vendor")
      .where("address", user.address)
      .select("-password")
      .limit(4);
    return res.json(vendors);
  } catch (err) {
    next(new Errors(500, err));
  }
};

export const vendorsByAddress = async (req, res, next) => {
  try {
    const address = req.params.address;
    let vendors;
    if (address.toLocaleLowerCase() === "all") {
      vendors = await User.where("type", "vendor").select("-password");
    } else {
      vendors = await User.where("type", "vendor")
        .where("address", address)
        .select("-password");
    }
    return res.json(vendors);
  } catch (err) {
    next(new Errors(500, err));
  }
};
