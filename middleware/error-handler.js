import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.code === 11000) {
    customError.msg = `User with email: ${err.keyValue.email} already exists`;
    customError.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    const errMsg = Object.values(err.errors)
      .map((field) => field.properties.path)
      .join(",");
    customError.msg = `Please provide valid ${errMsg}`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item with id: ${err.value} was found`;
    customError.statusCode = 400;
  }

  console.log(err);

  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, customError });

  //return res.status(500).json({ err });
};

export default errorMiddleware;
