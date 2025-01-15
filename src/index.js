import express from "express";
import userRouter from "./routes/users.routes.js";
import reservesRouter from "./routes/reserves.routes.js";
import flightRouter from "./routes/flights.routes.js";
import crewRouter from "./routes/crew.routes.js";
import planeRouter from "./routes/plane.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import passengerRouter from "./routes/passenger.routes.js";
import "dotenv/config";
const app = express();

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
