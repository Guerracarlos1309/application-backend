import { text } from "express";
import { db } from "../database/connection.database.js";

const createPlane = async ({
  tuition,
  name,
  passenger_capacity,
  flight_hours,
  id_status,
  id_model,
}) => {
  const query = {
    text: `INSERT INTO plane (tuition, name, passenger_capacity, flight_hours, id_status, id_model) VALUES ($1, $2, $3, $4, $5, $6) returning *`,
    values: [
      tuition,
      name,
      passenger_capacity,
      flight_hours,
      id_status,
      id_model,
    ],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getAll = async () => {
  const query = {
    text: `SELECT * from plane`,
  };

  const { rows } = await db.query(query);
  return rows;
};

const getPlaneById = async (tuition) => {
  const query = {
    text: `SELECT * from plane where tuition = $1`,
    values: [tuition],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getPlaneByStatus = async (id_status) => {
  const query = {
    text: `SELECT * FROM plane WHERE id_status = $1`,
    values: [id_status],
  };

  const { rows } = await db.query(query);
  return rows;
};

const updateFlight = async (tuition, flight_hours) => {
  const query = {
    text: `UPDATE plane set flight_hours = $1 WHERE tuition = $2 RETURNING *`,
    values: [flight_hours, tuition],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const deletePlane = async (tuition) => {
  const query = {
    text: `DELETE FROM plane WHERE tuition = $1 RETURNING*`,
    values: [tuition],
  };

  const { rows } = await db.query(query);

  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const existingPlane = async (tuition) => {
  const query = {
    text: `SELECT 1 FROM plane WHERE tuition = $1 LIMIT 1`,
    values: [tuition],
  };

  const { rows } = await db.query(query);
  return rows.length > 0;
};

export const planeModel = {
  createPlane,
  getAll,
  getPlaneById,
  getPlaneByStatus,
  updateFlight,
  deletePlane,
  existingPlane,
};
