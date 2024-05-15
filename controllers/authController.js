import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const login = async (req, res) => {
  //check if user exists
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("This account does not exist");
  }

  //check if provided password is correct
  const passwordCheck = await user.checkPassword(password);

  if (!passwordCheck) {
    throw new UnauthenticatedError("Incorrect password");
  }

  //if user exists and password matches then return auth token
  const token = await user.generateJWT();
  const userNoPassword = { name: user.name, email: user.email };
  return res
    .status(StatusCodes.OK)
    .json({ user: userNoPassword, token: token });
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = await user.generateJWT();
  const userNoPassword = {
    name: user.name,
    email: user.email,
  };
  res.status(StatusCodes.CREATED).json({ user: userNoPassword, token });
};

const updateUser = async (req, res) => {
  const { name, email, lastName } = req.body;
  if (!name || !email || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.Id });

  user.name = name;
  user.email = email;
  user.lastName = lastName;

  await user.save();

  const userFrontend = {
    name: user.name,
    email: user.email,
    lastName: user.lastName,
  };

  const token = await user.generateJWT();
  return res.status(StatusCodes.OK).json({ user: userFrontend, token: token });
};

export { login, register, updateUser };
