import { data } from "../data/data.js";

export const getFlights = () => {
  return data.flights;
};

export const getFlightById = (id) => {
  let flight;

  for (const u of data.flights) {
    if (u.id === id) {
      flight = u;
      break;
    }
  }
  return flight;
};

export const postFlight = (body) => {
  const {
    id,
    flightNumber,
    airline,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    departure,
    destination,
    status,
  } = body;

  if (
    !id ||
    !flightNumber ||
    !airline ||
    !departureDate ||
    !arrivalDate ||
    !departureTime ||
    !arrivalTime ||
    !departure ||
    !destination ||
    !status
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }

  let existingFlight = false;

  for (const u of data.flights) {
    if (u.id === id) {
      existingFlight = true;
      break;
    }
  }
  if (existingFlight) {
    return { error: true, mensaje: "The flight already exists" };
  }

  const newFlight = {
    id,
    flightNumber,
    airline,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    departure,
    destination,
    status,
  };
  data.flights.push(newFlight);

  return {
    error: false,
    mensaje: "Flight added successfully",
    flight: newFlight,
  };
};
