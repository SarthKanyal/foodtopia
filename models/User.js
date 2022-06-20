import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: "String",
    required: [true, "Please provide email address"],
    minLength: 11,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: "String",
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
  },
  location: {
    type: "String",
    minLength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = async function (providedPassword) {
  const isPassword = await bcrypt.compare(providedPassword, this.password);
  return isPassword;
};

UserSchema.methods.generateJWT = function () {
  console.log("create token");
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;
