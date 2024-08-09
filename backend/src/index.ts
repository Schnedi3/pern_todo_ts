import mongoose from "mongoose";

import { app } from "./app";
import { PORT, MONGODB_URI } from "./config/config";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
