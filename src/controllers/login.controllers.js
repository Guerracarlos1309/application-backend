import { data } from "../data/data.js";

export const login = (email, password) => {
  let existingUser = false;
  let correctPassword = false;

  for (const u of data.users) {
    if (u.email === email) {
      existingUser = true;
      if (u.password === password) correctPassword = true;
      break;
    }
  }

  return { existingUser, correctPassword };
};
