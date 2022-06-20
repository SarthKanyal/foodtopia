import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import { errorMiddleware } from "./middleware/index.js";
import connectDB from "./db/connect.js";
import User from "./models/User.js";
import authRouter from "./routes/authRoutes.js";
import itemsRouter from "./routes/itemsRouter.js";

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Hello people");
});

app.post("/addPerson", async (req, res) => {
  const person = await User.create({ name: "Sam" });
  return res.send({ person });
});

app.use("/", errorMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
