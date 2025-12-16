import "dotenv/config";
import express from "express";
import cors from "cors";
import ownerRoutes from "./routes/owner.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/owners", ownerRoutes)
