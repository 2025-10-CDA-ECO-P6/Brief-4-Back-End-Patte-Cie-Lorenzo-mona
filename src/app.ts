import "dotenv/config";
import express from "express";
import cors from "cors";
import veterinarianRoutes from "./routes/veterinarian.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/veterinarians", veterinarianRoutes);
