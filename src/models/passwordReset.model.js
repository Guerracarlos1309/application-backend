import { db } from "../database/connection.database.js";

const resetToken = async () => {
  const query = {
    text: `INSERT INTO password_reset (token, email) VALUES ($1, $2) RETURNING *`,
    values: [token, email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};
