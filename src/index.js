import express from "express";
import userRouter from "./routes/users.routes.js";
import reservesRouter from "./routes/reserves.routes.js";
import flightRouter from "./routes/flights.routes.js";
import crewRouter from "./routes/crew.routes.js";
import planeRouter from "./routes/plane.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import passengerRouter from "./routes/passenger.routes.js";
import "dotenv/config";
import cors from "cors";

const app = express();

import { createExcel } from "./createPlane.js";

app.get("/download-excel", async (req, res) => {
  console.log("📥 Petición para descargar Excel recibida");

  const filePath = await createExcel(); // Genera el archivo
  if (!filePath) {
    return res
      .status(500)
      .json({ error: "No se pudo generar el archivo Excel" });
  }

  res.download(filePath, "planes.xlsx", (err) => {
    if (err) {
      console.error("❌ Error al enviar el archivo:", err);
      res.status(500).json({ error: "Error al descargar el archivo" });
    }
  });
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reserves", reservesRouter);
app.use("/api/v1/crew", crewRouter);
app.use("/api/v1/flights", flightRouter);
app.use("/api/v1/plane", planeRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/passenger", passengerRouter);

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
