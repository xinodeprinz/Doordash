import Errors from "http-errors";
import jwt from "jsonwebtoken";
import ExpiredToken from "../models/ExpiredToken.js";

export default async function verifyToken(req, res, next) {
  try {
    // Making sure the token is a Bearer token
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(new Errors(401, "Unauthorized"));
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token) {
      return next(new Errors(401, "Unauthorized"));
    }

    // Checking if the token already exist in the database
    const exists = await ExpiredToken.findOne({ token });
    if (exists) {
      return next(new Errors(401, "Unauthorized"));
    }

    //Verifying token
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    next(new Errors(401, "Unauthorized"));
  }
}
