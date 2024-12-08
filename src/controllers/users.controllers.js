import { data } from "../data/data.js";

export const getUsers = () => {
  return data.users;
};

export const getUserById = (userId) => {
  let user;
  for (const u of data.users) {
    if (u.userId === userId) {
      user = u;
      break;
    }
  }
  return user;
};

export const newUsers = (body) => {
  const { userId, name, email, password, phoneNumber, adress, role, status } =
    body;

  if (!userId || !name || !email || !password || !role || !status) {
    return res.json({ mensaje: "Missing required fields" });
  }

  // Comprobar que el usuario no existe

  let existingUser = false;
  for (const u of data.users) {
    if (u.userId === userId) {
      existingUser = true;
      break;
    }
  }
  if (existingUser) {
    return { error: true, mensaje: "The user already exists" };
  }

  // crear nuevo usuario

  const newUser = {
    userId,
    name,
    email,
    password,
    phoneNumber,
    adress,
    role,
    status,
  };
  data.users.push(newUser);

  return {
    error: false,
    mensaje: "User successfully added",
    user: newUser,
  };
};
