import { data } from "../data/data.js";
export const getReserves = () => {
  return data.reserves;
};

export const getReserveById = (id) => {
  let reserve;

  for (const u of data.reserves) {
    if (u.id === id) {
      reserve = u;
      break;
    }
  }
  return reserve;
};

export const newReserves = (body) => {
  const {
    id,
    number,
    clientName,
    date,
    total,
    numberBabagge,
    idFlight,
    methodPay,
    arrival,
    departure,
    flightTime,
  } = body;

  if (
    !id ||
    !number ||
    !clientName ||
    !date ||
    !idFlight ||
    !arrival ||
    !departure
  ) {
    return res.json({ mensaje: "Missing required fields" });
  }
  let existingReserve = false;

  for (const u of data.reserves) {
    if (u.id === id) {
      existingReserve = true;
      break;
    }
  }
  if (existingReserve) {
    return { error: true, mensaje: "The reserve already exists" };
  }

  const newReserve = {
    id,
    number,
    clientName,
    date,
    total,
    numberBabagge,
    idFlight,
    methodPay,
    arrival,
    departure,
    flightTime,
  };
  data.reserves.push(newReserve);

  return {
    error: false,
    mensaje: "Successfully added reserve",
    reserve: newReserve,
  };
};
