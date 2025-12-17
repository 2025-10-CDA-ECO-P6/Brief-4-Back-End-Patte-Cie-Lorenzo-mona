import "dotenv/config";
import express from "express";
import cors from "cors";
import ownerRoutes from "./routes/owner.routes";
import veterinarianRoutes from "./routes/veterinarian.routes";
import { errorMiddleware } from "./middlewares/errors.middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/owners", ownerRoutes);
app.use("/api/veterinarians", veterinarianRoutes);

app.use(errorMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  Gestion route erreur 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});
