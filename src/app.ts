import "dotenv/config";
import express from "express";
import cors from "cors";
import ownerRoutes from "./routes/owner.routes";
import veterinarianRoutes from "./routes/veterinarian.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/owners", ownerRoutes);
app.use("/api/veterinarians", veterinarianRoutes);
