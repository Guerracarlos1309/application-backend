import { passengerModel } from "../models/passenger.models.js";

const createPassenger = async (req, res) => {
  const {
    id_passenger,
    firstname,
    lastname,
    birthdate,
    gmail,
    phone_number,
    address,
  } = req.body;

  if (
    !id_passenger ||
    !firstname ||
    !lastname ||
    !birthdate ||
    !gmail ||
    !phone_number ||
    !address
  ) {
    return res.json({ mensaje: "missing required fields" });
  }

  try {
    const passengerExists = await passengerModel.existingPassenger(
      id_passenger
    );

    if (passengerExists) {
      return res.json({
        status: "error",
        message: `Passenger with ID ${id_passenger} already exists`,
      });
    }

    const passengerExistsGmail = await passengerModel.existingPassengergmail(
      gmail
    );

    if (passengerExistsGmail) {
      return res.json({
        status: "error",
        message: `Passenger witdh gmail ${gmail} already exists`,
      });
    }
    const newPassenger = await passengerModel.createPassenger({
      id_passenger,
      firstname,
      lastname,
      birthdate,
      gmail,
      phone_number,
      address,
    });
    return res.json({
      status: "success",
      message: "passenger created",
      data: newPassenger,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

const deletePassenger = async (req, res) => {
  const { id_passenger } = req.params;

  if (!id_passenger) {
    return res.status(400).json({
      status: "error",
      message: "id_passenger is required",
    });
  }

  try {
    const deletedPassenger = await passengerModel.deletePassenger(id_passenger);

    if (!deletedPassenger) {
      return res.status(404).json({
        status: "error",
        message: `Passenger with ID ${id_passenger} not found`,
      });
    }

    return res.json({
      status: "success",
      message: `Passenger with id ${id_passenger} has been deleted`,
      data: deletedPassenger,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error deleting passenger",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const passenger = await passengerModel.findAllPassenger();
    return res.json({
      status: `success`,
      data: passenger,
    });
  } catch (error) {
    return res.json({
      status: "Error",
      message: "error fetching pasajeros",
      error: error.message,
    });
  }
};

export const passengerController = {
  createPassenger,
  deletePassenger,
  getAll,
};
