import "dotenv/config";
import { app } from "./app";
import express from "express";
import cors from "cors";
import { initCron } from "./cron";

app.use(cors());
app.use(express.json());
initCron();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
