import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Missing required fields",
      });
    }

    const usuario = await userModel.findOneByEmail(gmail);

    if (usuario) {
      return res.status(409).json({
        ok: false,
        msg: "The user already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await userModel.create({
      gmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        gmail: newUser.gmail,
        fk_role: newUser.fk_role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1000h",
      }
    );

    return res.json({
      ok: true,
      msg: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};

const login = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Missing required fields",
      });
    }

    const user = await userModel.findOneByEmail(gmail);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        gmail: user.gmail,
        fk_role: user.fk_role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1000h",
      }
    );

    return res.json({
      ok: true,
      msg: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await userModel.findOneByEmail(req.gmail);
    return res.json({ ok: true, msg: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userModel.findAll();
    return res.json({ ok: true, msg: users });
  } catch (error) {}
};

const updateRole = async (req, res) => {
  try {
    const { iduser } = req.params;

    const user = await userModel.findOneById(iduser);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    const updatedUser = await userModel.updateRole(iduser);

    return res.json({ ok: true, msg: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      ok: true,
      msg: "Logout exitoso",
    });
  } catch (error) {
    console.error("Error en el logout:", error);
    res.status(500).json({
      ok: false,
      msg: "Hubo un error al intentar cerrar sesión",
    });
  }
};

// const logout = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//       return res.json({
//         ok: false,
//         msg: "Token no proporcionado",
//       });
//     }
//     blackListModels.addToken(token);
//     return res.json({
//       ok: true,
//       msg: "Logout exitoso",
//     });
//   } catch (error) {
//     return res.json({
//       ok: false,
//       msg: "Error al intentar cerrar sesion",
//     });
//   }
// };

const deleteUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const user = await userModel.deleteUser(iduser);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    return res.json({ ok: true, msg: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error deleting user",
    });
  }
};

const resetPassword = async (req, res) => {
  const { gmail, newPassword } = req.body;
  try {
    const user = await userModel.findOneByEmail(gmail);
    if (!user) {
      return res.json({ ok: false, msg: "Usuario no encontrado" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const result = await userModel.updatePassword({
      gmail,
      newPassword: hashedPassword,
    });

    if (result.rowCount === 0) {
      res.json({ ok: false, msg: "No se pudo actualizar la contraseña" });
    }

    res.json({ ok: true, msg: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.json({ ok: false, msg: "Error al restablecer la contraseña" });
  }
};

export const userController = {
  register,
  login,
  profile,
  findAll,
  updateRole,
  logout,
  deleteUser,
  resetPassword,
};
