import "dotenv/config";
import express from "express";
import cors from "cors";
import ownerRoutes from "./routes/owner.routes";
import veterinarianRoutes from "./routes/veterinarian.routes";
import { errorMiddleware } from "./middlewares/errors.middlewares";
import treatmentRoutes from "./routes/treatment.routes";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import vaccinationRoutes from "./routes/vaccination.routes";
import consultationRoutes from "./routes/consultation.routes";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/owners", ownerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/veterinarians", veterinarianRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  Gestion route erreur 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});
