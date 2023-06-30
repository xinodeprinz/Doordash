import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./router.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import ErrorHandler from "./middlewares/ErrorHandler.js";

const { PORT, DB_URI, ORIGIN } = process.env;

const app = express();

// Middlewares
app.use(
  cors({
    origin: ORIGIN,
  })
);
app.use(express.static("assets"));
app.use(express.json());
app.use(fileUpload());
app.use(router);
app.use(ErrorHandler);

app.listen(PORT, () => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongodb database"))
    .catch((err) => console.log("Error connecting to mongodb database"));
  console.log(`Server running on http://localhost:${PORT}`);
});
