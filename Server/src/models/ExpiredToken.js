import { Schema, model } from "mongoose";

const expiredTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ExpiredToken = model("ExpiredToken", expiredTokenSchema);

export default ExpiredToken;
