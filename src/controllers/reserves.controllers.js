import { reservesModel } from "../models/reserves.models.js";

const createReserve = async (req, res) => {
  const {
    id_reservation,
    reservation_date,
    reservation_status,
    departure_date,
    arrival_date,
    confirmation_number,
    id_flight,
    id_user,
    id_luggage,
  } = req.body;

  if (
    !id_reservation ||
    !reservation_date ||
    !departure_date ||
    !arrival_date ||
    !id_user ||
    !id_flight ||
    !reservation_status ||
    !confirmation_number
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }
  try {
    const reservationExists = await reservesModel.existingReserve(
      id_reservation
    );
    if (reservationExists) {
      return res.json({
        status: "error",
        message: `Reservation with ID ${id_reservation} already exists`,
      });
    }
    const userExists = await reservesModel.exists(
      "usuario",
      "id_user",
      id_user
    );
    if (!userExists) {
      return res.json({
        status: "error",
        message: `User with ID ${id_user} does not exist`,
      });
    }

    const flightExists = await reservesModel.exists(
      "flight",
      "id_flight",
      id_flight
    );
    if (!flightExists) {
      return res.json({
        status: "error",
        message: `Flight with ID ${id_flight} does not exist`,
      });
    }

    const luggageExists = await reservesModel.exists(
      "luggage",
      "id_luggage",
      id_luggage
    );
    if (!luggageExists) {
      return res.status(404).json({
        status: "error",
        message: `Luggage with ID ${id_luggage} does not exist`,
      });
    }

    const reservation = await reservesModel.createReserve({
      id_reservation,
      reservation_date,
      reservation_status,
      departure_date,
      arrival_date,
      confirmation_number,
      id_flight,
      id_user,
      id_luggage,
    });
    return res.json({ mensaje: "Successfully added reserve", reservation });
  } catch (error) {
    return res.json({ mensaje: "Error adding reserve", error });
  }
};

const findByReservationByDate = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({
      status: "error",
      message: "Missing required parameters: dateType and date",
    });
  }

  try {
    const reservations = await reservesModel.findByReservationByDate(date);

    if (reservations.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No reservations found for ${date}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Reservations found for ${date}`,
      data: reservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({
      status: "error",
      message: "Error fetching reservations",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id_reservation, reservation_status } = req.body;

  if (!id_reservation || !reservation_status) {
    return res.status(400).json({
      status: "error",
      message:
        "Missing required parameters: id_reservation and reservation_status",
    });
  }

  try {
    const reservation = await reservesModel.updateStatus(
      id_reservation,
      reservation_status
    );

    if (reservation.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `Reservation with ID ${id_reservation} not found`,
      });
    }

    return res.json({
      status: "success",
      message: `Reservation with ID ${id_reservation} updated`,
      data: reservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).json({
      status: "error",
      message: "Error updating reservation",
      error: error.message,
    });
  }
};

const deleteReserve = async (req, res) => {
  const { id_reservation } = req.params;

  if (!id_reservation) {
    return res.status(400).json({
      status: "error",
      message: "id_reservation is required",
    });
  }

  try {
    const deletedReservation = await reservesModel.deleteReserve(
      id_reservation
    );

    if (!deletedReservation) {
      return res.status(404).json({
        status: "error",
        message: `Reservation with ID ${id_reservation} not found`,
      });
    }

    return res.json({
      status: "success",
      message: `Reservation with ID ${id_reservation} has been deleted`,
      data: deletedReservation,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error deleting reservation",
      error: error.message,
    });
  }
};

const getAllReserves = async (req, res) => {
  try {
    const reserves = await reservesModel.getAllReserves();

    if (reserves.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No reservations found",
      });
    }

    return res.json({
      status: "success",
      message: "Reservations retrieved successfully",
      data: reserves,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({
      status: "error",
      message: "Error fetching reservations",
      error: error.message,
    });
  }
};

export const reservesController = {
  createReserve,
  findByReservationByDate,
  updateStatus,
  deleteReserve,
  getAllReserves,
};
