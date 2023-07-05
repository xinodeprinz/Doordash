import { Schema, model } from "mongoose";

const errandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Errand = model("Errand", errandSchema);

export default Errand;
