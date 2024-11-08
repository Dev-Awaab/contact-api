import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
