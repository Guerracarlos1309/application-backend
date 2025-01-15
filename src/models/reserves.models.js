import { db } from "../database/connection.database.js";

const createReserve = async ({
  id_reservation,
  reservation_date,
  reservation_status,
  departure_date,
  arrival_date,
  confirmation_number,
  id_flight,
  id_user,
  id_luggage,
}) => {
  const query = {
    text: `INSERT INTO reservation (id_reservation, reservation_date,reservation_status, departure_date, arrival_date,confirmation_number,  id_flight,id_user,  id_luggage ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`,
    values: [
      id_reservation,
      reservation_date,
      reservation_status,
      departure_date,
      arrival_date,
      confirmation_number,
      id_flight,
      id_user,
      id_luggage,
    ],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const exists = async (table, column, id) => {
  const query = {
    text: `SELECT 1 FROM ${table} WHERE ${column} = $1 LIMIT 1`,
    values: [id],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

const existingReserve = async (id_reservation) => {
  const query = {
    text: `SELECT 1 FROM reservation WHERE id_reservation = $1 LIMIT 1`,
    values: [id_reservation],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

const findByReservationByDate = async (reservation_date) => {
  const query = {
    text: `SELECT * FROM reservation WHERE reservation_date = $1`,
    values: [reservation_date],
  };
  const { rows } = await db.query(query);
  return rows;
};

const updateStatus = async (id_reservation, reservation_status) => {
  const query = {
    text: `UPDATE reservation SET reservation_status = $1 WHERE id_reservation = $2 RETURNING *`,
    values: [reservation_status, id_reservation],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const deleteReserve = async (id_reservation) => {
  const query = {
    text: `DELETE FROM reservation WHERE id_reservation = $1`,
    values: [id_reservation],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const getAllReserves = async () => {
  const query = {
    text: `SELECT * FROM reservation ORDER BY reservation_date DESC`,
  };
  const { rows } = await db.query(query);
  return rows;
};

export const reservesModel = {
  createReserve,
  exists,
  existingReserve,
  findByReservationByDate,
  updateStatus,
  deleteReserve,
  getAllReserves,
};
