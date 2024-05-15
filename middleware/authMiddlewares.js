import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import validator from "validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  next();
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

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { Id: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

export { authMiddleware, loginMiddleware, registerMiddleware };
