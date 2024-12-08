import express from "express";
import { PORT } from "./config.js";
import userRouter from "./routes/users.routes.js";
import reservesRouter from "./routes/reserves.routes.js";
import loginRouter from "./routes/login.routes.js";
import flightRouter from "./routes/flights.routes.js";
import crewRouter from "./routes/crew.routes.js";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(reservesRouter);
app.use(loginRouter);
app.use(flightRouter);
app.use(crewRouter);

app.listen(PORT);
console.log("Server on port", PORT);
