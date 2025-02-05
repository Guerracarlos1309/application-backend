import { text } from "express";
import { db } from "../database/connection.database.js";

const createFlight = async ({
  id_flight,
  flight_number,
  airport_departure,
  airport_arrival,
  id_services,
  id_tuition,
  id_passenger,
}) => {
  const query = {
    text: `INSERT INTO flight (id_flight,flight_number,
    airport_departure,
    airport_arrival,
    id_services,
    id_tuition,
    id_passenger)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [
      id_flight,
      flight_number,
      airport_departure,
      airport_arrival,
      id_services,
      id_tuition,
      id_passenger,
    ],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const getAll = async () => {
  const query = {
    text: `select f.id_flight as "id_flight",
          f.flight_number as "flight_number",
          a.name as "a_departure",
          x.name as "a_arrival",
          concat(p.firstname,' ',p.lastname) as "passenger_name",
          s.name_services as "service",
          t.tuition as "tuition",
          t.name as "name"
          from flight f join airport a on f.airport_departure = a.id_airport
		      join airport x on f.airport_arrival = x.id_airport
		      join passenger p on f.id_passenger = p.id_passenger
		      join services s on f.id_services = s.id_services
		      join plane t on f.id_tuition = t.tuition  order by f.id_flight asc`,
  };
  const { rows } = await db.query(query);
  return rows;
};

const getById = async (id_flight) => {
  const query = {
    text: `SELECT * FROM flight WHERE id_flight = $1`,
    values: [id_flight],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateFlight = async (id_flight, id_services) => {
  const query = {
    text: `UPDATE flight SET id_services = $2 WHERE id_flight = $1 RETURNING *`,
    values: [id_flight, id_services],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const deleteFlight = async (id_flight) => {
  const query = {
    text: `DELETE FROM flight WHERE id_flight = $1`,
    values: [id_flight],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const existingFlightId = async (id_flight) => {
  const query = {
    text: `SELECT 1 FROM flight WHERE id_flight = $1 LIMIT 1`,
    values: [id_flight],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

const existingFlightNumber = async (flight_number) => {
  const query = {
    text: `SELECT 1 FROM flight WHERE flight_number = $1 LIMIT 1`,
    values: [flight_number],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

export const flightModel = {
  createFlight,
  getAll,
  getById,
  updateFlight,
  deleteFlight,
  existingFlightId,
  existingFlightNumber,
};
