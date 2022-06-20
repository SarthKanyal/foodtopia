import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const login = async (req, res) => {
  const { email, password } = req.body;

  return res.json("login");
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.generateJWT();
  const userNoPassword = {
    name: user.name,
    email: user.email,
  };
  res.status(StatusCodes.CREATED).json({ user: userNoPassword, token });
};

const updateUser = async (req, res) => {
  return res.json("updateUser");
};

export { login, register, updateUser };
