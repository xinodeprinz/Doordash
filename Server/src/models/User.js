import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
    photo: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
