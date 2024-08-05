// required packages
import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app";

// call .env
dotenv.config();

// connect to Mongo
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
