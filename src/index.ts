import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { router } from "./router";

const db_url = "mongodb://0.0.0.0:27017";

mongoose
  .connect(db_url)
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar o MongoDB: " + error));
