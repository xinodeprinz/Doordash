import { loginSchema, registerSchema } from "../schemas.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Errors from "http-errors";
import ExpiredToken from "../models/ExpiredToken.js";

export const register = async (req, res, next) => {
  try {
    const value = await registerSchema.validateAsync(req.body);
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    value.password = bcrypt.hashSync(value.password, salt);
    const user = new User(value);
    await user.save();
    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    next(new Errors(422, err));
  }
};

export const login = async (req, res, next) => {
  try {
    const value = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ phone: value.phone });
    if (!user) {
      return next(new Errors(401, "Invalid phone number or password"));
    }
    const isPassword = await bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return next(new Errors(401, "Invalid phone number or password"));
    }
    const { password, ...rest } = user.toObject();
    const token = jwt.sign({ id: rest._id }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return res.json({ message: "Login successful!", token, user: rest });
  } catch (err) {
    next(new Errors(422, err));
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const expiredToken = new ExpiredToken({ token });
    await expiredToken.save();
    req.user = null;
    req.headers.authorization = null;
    return res.json({ message: "Logout successful" });
  } catch (error) {
    next(new Errors(500, "An error occured!"));
  }
};
