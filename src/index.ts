import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

mongoose
  .connect(`${process.env.DB_URI}`)
  .then(() => {
    console.log("Database connected");

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(routes);

    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
