import "reflect-metadata";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

import express from "express";
import cors from "cors";
import router from "./routes";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("✔️  Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("❌  Error during Data Source initialization:", err);
  });

const PORT = process.env.PORT || 3333;
const BASE_URL = process.env.BASE_URL || "/api";
const app = express();

app.use(express.json());

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(BASE_URL, router);

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
