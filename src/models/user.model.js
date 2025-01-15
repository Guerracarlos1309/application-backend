import { text } from "express";
import { db } from "../database/connection.database.js";

const create = async ({ gmail, password }) => {
  const query = {
    text: `INSERT INTO usuarios (gmail, password ) VALUES ($1, $2)
    RETURNING gmail,fk_role`,
    values: [gmail, password],
  };

  const { rows } = await db.query(query);
  return rows;
};

const findOneByEmail = async (gmail) => {
  const query = {
    text: `SELECT * FROM usuarios WHERE gmail = $1`,
    values: [gmail],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: `SELECT iduser,gmail,fk_role FROM usuarios ORDER BY iduser asc`,
  };
  const { rows } = await db.query(query);
  return rows;
};

const findOneById = async (iduser) => {
  const query = {
    text: `SELECT * FROM usuarios WHERE iduser = $1`,
    values: [iduser],
  };
  const { rows } = await db.query(query);

  return rows[0];
};
const updateRole = async (iduser) => {
  const query = {
    text: `UPDATE usuarios SET fk_role = 2 WHERE iduser = $1 RETURNING *`,
    values: [iduser],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updatePassword = async (iduser, password) => {
  const query = {
    text: `UPDATE usuarios SET password = $2 WHERE gmail = $1 RETURNING *`,
    values: [gmail, password],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const deleteUser = async (iduser) => {
  const query = {
    text: `DELETE FROM usuarios WHERE iduser = $1 returning iduser`,
    values: [iduser],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const userModel = {
  create,
  findOneByEmail,
  findAll,
  findOneById,
  updateRole,
  updatePassword,
  deleteUser,
};
