import { planeModel } from "../models/plane.models.js";

const createPlane = async (req, res) => {
  const {
    tuition,
    name,
    passenger_capacity,
    flight_hours,
    id_status,
    id_model,
  } = req.body;
  console.log("Petición recibida:", req.body);

  if (
    !tuition ||
    !name ||
    !passenger_capacity ||
    !flight_hours ||
    !id_status ||
    !id_model
  ) {
    return res.json({
      status: "error",
      message: "missing required fields",
    });
  }

  try {
    const existPlane = await planeModel.existingPlane(tuition);

    if (existPlane) {
      return res.json({
        status: "error",
        message: `Plane with tuition ${tuition} already exists`,
      });
    }
    const newPlane = await planeModel.createPlane({
      tuition,
      name,
      passenger_capacity,
      flight_hours,
      id_status,
      id_model,
    });

    return res.json({
      status: "success",
      message: "plane created succesfully",
      data: newPlane,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error creating plane",
      error: error.message,
    });
  }
};

const getStatuses = async (req, res) => {
  try {
    const status = await planeModel.getStatuses();
    return res.json({
      status: "success",
      data: status,
    });
  } catch (error) {
    return res.json({
      status: "Error",
      message: "error fetching planes",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const planes = await planeModel.getAll();
    return res.json({
      status: "success",
      data: planes,
    });
  } catch (error) {
    return res.json({
      status: "Error",
      message: "error fetching planes",
      error: error.message,
    });
  }
};

const getPlaneById = async (req, res) => {
  const { tuition } = req.params;

  try {
    const plane = await planeModel.getPlaneById(tuition);

    if (!plane) {
      return res.status(404).json({
        status: "error",
        message: `Plane with id ${id_plane} not found`,
      });
    }

    return res.json({
      status: "success",
      data: plane,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error fetching plane by id",
      error: error.message,
    });
  }
};

const getPlaneByStatus = async (req, res) => {
  const { id_status } = req.params;

  try {
    const planes = await planeModel.getPlaneByStatus(id_status);

    if (planes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No planes found with status id ${id_status}`,
      });
    }

    return res.json({
      status: "success",
      data: planes,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error fetching planes by status",
      error: error.message,
    });
  }
};

const updateFlight = async (req, res) => {
  const { tuition } = req.params;
  const { flight_hours } = req.body;

  try {
    const plane = await planeModel.updateFlight(tuition, flight_hours);

    if (!plane) {
      return res.status(404).json({
        status: "error",
        message: `Plane with id ${id_plane} not found`,
      });
    }

    return res.json({
      status: "success",
      message: `Flight hours updated successfully`,
      data: plane,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error updating flight hours",
      error: error.message,
    });
  }
};

const deletePlane = async (req, res) => {
  const { tuition } = req.params;

  try {
    const plane = await planeModel.deletePlane(tuition);

    if (!plane) {
      return res.status(404).json({
        status: "error",
        message: `Plane with id ${tuition} not found`,
      });
    }

    return res.json({
      status: "success",
      message: `Plane with id ${tuition} has been deleted`,
      data: plane,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error deleting plane",
      error: error.message,
    });
  }
};

export const planeControllers = {
  createPlane,
  getAll,
  getPlaneById,
  getPlaneByStatus,
  updateFlight,
  deletePlane,
  getStatuses,
};
