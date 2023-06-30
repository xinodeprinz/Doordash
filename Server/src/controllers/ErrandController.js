import Errors from "http-errors";
import Errand from "../models/Errand.js";
import { errandSchema } from "../schemas.js";
import { randomString } from "../utils.js";

export const createErrand = async (req, res, next) => {
  try {
    const value = await errandSchema.validateAsync(req.body);
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
    const photoName = `errands/${randomString(50)}.${ext}`;
    photo.mv(`./assets/${photoName}`);
    value.photo = photoName;
    const errand = new Errand(value);
    await errand.save();
    return res.json({ message: "Errand created!" });
  } catch (err) {
    next(new Errors(422, err));
  }
};

export const popularErrands = async (req, res, next) => {
  try {
    const errands = await Errand.find().limit(4);
    return res.json(errands);
  } catch (err) {
    next(new Errors(500, err));
  }
};

export const errands = async (req, res, next) => {
  try {
    const errands = await Errand.find();
    return res.json(errands);
  } catch (err) {
    next(new Errors(500, err));
  }
};
