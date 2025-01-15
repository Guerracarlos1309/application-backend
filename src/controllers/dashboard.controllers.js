import { dashboardModel } from "../models/dashboard.models.js";

const getData = async (req, res) => {
  try {
    const data = await dashboardModel.getData();

    return res.json({
      status: "success",
      message: "dashboard data fetched successfully",
      data,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "error fetching dashboard data",
      error: error.message,
    });
  }
};

export const dashboardControllers = {
  getData,
};
