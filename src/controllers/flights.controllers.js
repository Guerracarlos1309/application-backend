import { flightModel } from "../models/flights.models.js";

const createFlight = async (req, res) => {
  const {
    id_flight,
    flight_number,
    airport_departure,
    airport_arrival,
    id_services,
    id_tuition,
    id_passenger,
  } = req.body;

  if (
    !id_flight ||
    !flight_number ||
    !airport_departure ||
    !airport_arrival ||
    !id_services ||
    !id_tuition ||
    !id_passenger
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }

  try {
    const existFlightId = await flightModel.existingFlightId(id_flight);

    if (existFlightId) {
      return res.json({
        status: "error",
        message: `Flight with ID ${id_flight} already exists`,
      });
    }

    const existFlightNumber = await flightModel.existingFlightNumber(
      flight_number
    );

    if (existFlightNumber) {
      return res.json({
        status: "error",
        message: `Flight with flight_number ${flight_number} already exists`,
      });
    }
    const newFlight = await flightModel.createFlight({
      id_flight,
      flight_number,
      airport_departure,
      airport_arrival,
      id_services,
      id_tuition,
      id_passenger,
    });
    return res.json({
      status: "success",
      message: "Flight created",
      data: newFlight,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const flights = await flightModel.getAll();
    return res.json({ status: "success", data: flights });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  const { id_flight } = req.params;
  try {
    const flight = await flightModel.getById(id_flight);

    if (!flight) {
      return res.json({ status: "error", message: "Flight not found" });
    }

    return res.json({ status: "success", data: flight });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

const updateFlight = async (req, res) => {
  const { id_flight } = req.params;
  const { id_services } = req.body;

  if (!id_services) {
    return res.json({ status: "error", message: "Missing required fields" });
  }

  try {
    const updatedFlight = await flightModel.updateFlight(
      id_flight,
      id_services
    );

    if (!updatedFlight) {
      return res.json({ status: "error", message: "Flight not found" });
    }

    return res.json({ status: "success", data: updatedFlight });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

const deleteFlight = async (req, res) => {
  const { id_flight } = req.params;

  try {
    const deletedFlight = await flightModel.deleteFlight(id_flight);

    if (!deletedFlight) {
      return res.json({ status: "error", message: "Flight not found" });
    }

    return res.json({ status: "success", message: "Flight deleted" });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

export const flightController = {
  createFlight,
  getAll,
  getById,
  updateFlight,
  deleteFlight,
};
