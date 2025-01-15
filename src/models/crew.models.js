import { db } from "../database/connection.database.js";

const createCrewMember = async ({
  id_license,
  firstname,
  lastname,
  birthdate,
  speciality,
  flight_hours,
  gmail,
  phone_number,
  address,
}) => {
  const query = {
    text: `INSERT INTO crew (id_license,
  firstname,
  lastname,
  birthdate,
  speciality,
  flight_hours,
  gmail,
  phone_number,
  address) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: [
      id_license,
      firstname,
      lastname,
      birthdate,
      speciality,
      flight_hours,
      gmail,
      phone_number,
      address,
    ],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const getAllCrewMembers = async () => {
  const query = {
    text: `SELECT * FROM crew order by id_license asc`,
  };
  const { rows } = await db.query(query);
  return rows;
};

const getCrewMemberById = async (id_license) => {
  const query = {
    text: `SELECT * FROM crew WHERE id_license = $1`,
    values: [id_license],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const getCrewByFlightHours = async (comparisonOperator, flight_hours) => {
  const query = {
    text: `SELECT * FROM crew WHERE flight_hours ${comparisonOperator} $1`,
    values: [flight_hours],
  };
  const { rows } = await db.query(query);
  return rows;
};

const updateCrewMember = async (id_license, updates) => {
  const {
    firstname,
    lastname,
    birthdate,
    speciality,
    flight_hours,
    gmail,
    phone_number,
    address,
  } = updates;

  const query = {
    text: `
      UPDATE crew 
      SET 
        firstname = $1,
        lastname = $2,
        birthdate = $3,
        speciality = $4,
        flight_hours = $5,
        gmail = $6,
        phone_number = $7,
        address = $8
      WHERE id_license = $9
      RETURNING *;
    `,
    values: [
      firstname,
      lastname,
      birthdate,
      speciality,
      flight_hours,
      gmail,
      phone_number,
      address,
      id_license,
    ],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    throw new Error("Error updating crew member");
  }
};

const deleteCrewMember = async (id_license) => {
  const query = {
    text: `DELETE FROM crew WHERE id_license = $1 RETURNING *`,
    values: [id_license],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    throw new Error("Error deleting crew member");
  }
};

const existingCrewEmail = async (gmail) => {
  const query = {
    text: `SELECT 1 FROM crew WHERE gmail = $1 LIMIT 1`,
    values: [gmail],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};
const existingCrewPhone = async (phone_number) => {
  const query = {
    text: `SELECT 1 FROM crew WHERE phone_number = $1 LIMIT 1`,
    values: [phone_number],
  };
  const { rows } = await db.query(query);
  return rows.length > 0;
};

export const crewModel = {
  createCrewMember,
  getAllCrewMembers,
  getCrewMemberById,
  updateCrewMember,
  deleteCrewMember,
  getCrewByFlightHours,
  existingCrewEmail,
  existingCrewPhone,
};
