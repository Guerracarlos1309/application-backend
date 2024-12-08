import { data } from "../data/data.js";

export const getCrew = () => {
  return data.crew;
};

export const getCrewById = (id) => {
  let flight;

  for (const u of data.crew) {
    if (u.id === id) {
      flight = u;
      break;
    }
  }
  return flight;
};

export const postCrew = (body) => {
  const {
    id,
    license,
    name,
    birthdate,
    speciality,
    flightHours,
    email,
    phoneNumber,
    address,
  } = body;

  if (
    !id ||
    !name ||
    !email ||
    !license ||
    !speciality ||
    !flightHours ||
    !phoneNumber ||
    !address
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }
  let existingCrew = false;

  for (const u of data.crew) {
    if (u.id === id) {
      existingCrew = true;
      break;
    }
  }

  if (existingCrew) {
    return { error: true, mensaje: "The staff with this id already exists" };
  }

  const newCrew = {
    id,
    license,
    name,
    birthdate,
    speciality,
    flightHours,
    email,
    phoneNumber,
    address,
  };
  data.crew.push(newCrew);

  return { error: false, mensaje: "Staff added successfully", crew: newCrew };
};
