import { db } from "../database/connection.database.js";

const getData = async () => {
  try {
    const flights = `SELECT COUNT(*) FROM flight`;
    const plane = `SELECT COUNT(*) FROM plane`;
    const reservation = `SELECT COUNT(*) FROM reservation`;
    const usuarios = `SELECT COUNT(*) FROM usuarios`;

    const flightsResult = await db.query(flights);
    const planesResult = await db.query(plane);
    const reservationsResult = await db.query(reservation);
    const usersResult = await db.query(usuarios);

    return {
      totalFlights: parseInt(flightsResult.rows[0].count),
      totalPlanes: parseInt(planesResult.rows[0].count),
      totalReservations: parseInt(reservationsResult.rows[0].count),
      totalUsers: parseInt(usersResult.rows[0].count),
    };
  } catch (error) {
    throw new Error("error fetching dashboard data");
  }
};

export const dashboardModel = {
  getData,
};
