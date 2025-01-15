import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token is required",
    });
  }

  token = token.split(" ")[1];

  try {
    const { gmail, fk_role } = jwt.verify(token, process.env.JWT_SECRET);
    req.gmail = gmail;
    req.fk_role = fk_role;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Invalid token",
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.fk_role === 2) {
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized only admin user",
  });
};

export const removeToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token is required",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.gmail = decode.gmail;
    req.fk_role = decode.fk_role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "failed to remove token",
    });
  }
};
