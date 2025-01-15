import { text } from "express";
import { db } from "../database/connection.database.js";

const createPassenger = async ({
  id_passenger,
  firstname,
  lastname,
  birthdate,
  gmail,
  phone_number,
  address,
}) => {
  const query = {
    text: `INSERT INTO passenger (id_passenger, firstname, lastname, birthdate, gmail, phone_number, address)
        values($1, $2, $3, $4, $5, $6, $7) returning *`,
    values: [
      id_passenger,
      firstname,
      lastname,
      birthdate,
      gmail,
      phone_number,
      address,
    ],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const existingPassenger = async (id_passenger) => {
  const query = {
    text: `SELECT 1 FROM passenger WHERE id_passenger = $1 LIMIT 1`,
    values: [id_passenger],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};
const existingPassengergmail = async (gmail) => {
  const query = {
    text: `SELECT 1 FROM passenger WHERE gmail = $1 LIMIT 1`,
    values: [gmail],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

const deletePassenger = async (id_passenger) => {
  const query = {
    text: `DELETE FROM passenger WHERE id_passenger = $1`,
    values: [id_passenger],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findAllPassenger = async () => {
  const query = {
    text: `SELECT * FROM passenger`,
  };
  const { rows } = await db.query(query);
  return rows;
};

export const passengerModel = {
  createPassenger,
  existingPassenger,
  existingPassengergmail,
  deletePassenger,
  findAllPassenger,
};
