import express from "express";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  showStats,
} from "../controllers/personalItemsController.js";

const router = express.Router();

router.route("/").get(getAllItems).post(createItem);
router.route("/:id").delete(deleteItem).patch(updateItem);
router.route("/stats").get(showStats);

export default router;
