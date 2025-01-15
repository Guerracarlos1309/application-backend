import { crewModel } from "../models/crew.models.js";

const createCrewMember = async (req, res) => {
  const {
    id_license,
    firstname,
    lastname,
    birthdate,
    speciality,
    flight_hours,
    gmail,
    phone_number,
    address,
  } = req.body;

  if (
    !id_license ||
    !firstname ||
    !lastname ||
    !birthdate ||
    !speciality ||
    !flight_hours ||
    !gmail ||
    !phone_number ||
    !address
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }

  try {
    const existingCrewMember = await crewModel.getCrewMemberById(id_license);

    if (existingCrewMember) {
      return res.json({
        status: "error",
        message: `Crew member with ID ${id_license} already exists`,
      });
    }

    const existCrewEmail = await crewModel.existingCrewEmail(gmail);

    if (existCrewEmail) {
      return res.json({
        status: "error",
        message: `Crew member with email ${gmail} already exists`,
      });
    }

    const existCrewPhone = await crewModel.existingCrewPhone(phone_number);

    if (existCrewPhone) {
      return res.json({
        status: "error",
        message: `Crew member with Phone Number ${phone_number} already exists`,
      });
    }

    const newcrewMember = await crewModel.createCrewMember({
      id_license,
      firstname,
      lastname,
      birthdate,
      speciality,
      flight_hours,
      gmail,
      phone_number,
      address,
    });
    return res.json({
      status: "success",
      message: "crew member created succesfully",
      data: newcrewMember,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error creating crew member",
      error: error.message,
    });
  }
};

const getAllCrewMembers = async (req, res) => {
  try {
    const crewMembers = await crewModel.getAllCrewMembers();
    return res.json({
      status: "success",
      message: "crew members retrieved successfully",
      data: crewMembers,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error retrieving crew members",
      error: error.message,
    });
  }
};

const updateCrewMember = async (req, res) => {
  const { id_license } = req.params;
  const updates = req.body;

  if (!id_license || Object.keys(updates).length === 0) {
    return res.json({
      mensaje: "Missing required fields or no updates provided",
    });
  }

  try {
    const updateMember = await crewModel.updateCrewMember(id_license, updates);

    if (!updateMember) {
      return res.json({
        status: "error",
        message: `Crew member with ID ${id_license} not found`,
      });
    }

    return res.json({
      status: "success",
      message: "Crew member updated successfully",
      data: updateMember,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error updating crew member",
      error: error.message,
    });
  }
};

const deleteCrewMember = async (req, res) => {
  const { id_license } = req.params;

  if (!id_license) {
    return res.json({ mensaje: "id_license is required" });
  }

  try {
    const deletedmember = await crewModel.deleteCrewMember(id_license);

    if (!deletedmember) {
      return res.json({
        status: "error",
        message: `Crew member with ID ${id_license} not found`,
      });
    }
    return res.json({
      status: "success",
      message: "Crew member deleted successfully",
      data: deletedmember,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error deleting crew member",
      error: error.message,
    });
  }
};

const getCrewByFlightHours = async (req, res) => {
  const { operator, flight_hours } = req.query;

  if (!operator || !flight_hours) {
    return res.json({ mensaje: "Missing required fields" });
  }

  const validOperators = ["<", "<=", "=", ">", ">="];
  if (!validOperators.includes(operator)) {
    return res.json({ mensaje: "Invalid operator" });
  }

  try {
    const crewMembers = await crewModel.getCrewByFlightHours(
      operator,
      flight_hours
    );

    if (crewMembers.length === 0) {
      return res.json({
        status: "error",
        message: `No crew members found with ${operator} ${flight_hours} flight hours`,
      });
    }

    return res.json({
      status: "success",
      message: `Crew members found with ${operator} ${flight_hours} flight hours`,
      data: crewMembers,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error retrieving crew members",
      error: error.message,
    });
  }
};

export const crewController = {
  createCrewMember,
  getAllCrewMembers,
  updateCrewMember,
  deleteCrewMember,
  getCrewByFlightHours,
};
