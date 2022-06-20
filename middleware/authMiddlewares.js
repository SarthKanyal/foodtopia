import { BadRequestError } from "../errors/index.js";
import validator from "validator";
import User from "../models/User.js";

const loginMiddleware = (req, res, next) => {
  if (!email || !password) {
    throw new BadRequestError("Please provide all fields");
  }
  return next();
};

const registerMiddleware = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new BadRequestError("Please provide all fields");
  }
  const alreadyExists = await User.findOne({ email: email });
  if (alreadyExists) {
    throw new BadRequestError(
      `${email} is already in use, please provide a different email`
    );
  }
  next();
};

export { loginMiddleware, registerMiddleware };
