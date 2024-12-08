import { Router } from "express";
import {
  getFlightById,
  getFlights,
  postFlight,
} from "../controllers/flights.controllers.js";

const router = Router();

router.get("/flights", (req, res) => {
  const flight = getFlights();

  if (!flight) {
    return res.json({ mensaje: "No flights found" });
  }
  res.json(flight);
});

router.get("/flights/:id", async (req, res) => {
  const { id } = req.params;
  const flight = await getFlightById(parseInt(id));

  if (flight) {
    res.json(flight);
  } else {
    res.json({ mensaje: "Flight not found" });
  }
});

router.post("/flights", (req, res) => {
  const body = req.body;
  const result = postFlight(body);

  if (result.error) {
    res.json({ mensaje: result.mensaje });
  } else {
    res.json({
      mensaje: result.mensaje,

      flight: result.flight,
    });
  }
});

export default router;
