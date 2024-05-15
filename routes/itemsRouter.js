import express from "express";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  showStats,
  donateItem,
  getDonationList,
  claimItem,
  getClaimedItems,
  deleteMany,
} from "../controllers/itemsController.js";

const router = express.Router();

router.route("/").get(getAllItems).post(createItem);
router.route("/:id").delete(deleteItem).patch(updateItem);
router.route("/donate/:id").patch(donateItem);
router.route("/claim").get(getDonationList);
router.route("/claim/:id").patch(claimItem);
router.route("/claimed").get(getClaimedItems);
router.route("/stats").get(showStats);
router.route("/sacred/delete").delete(deleteMany);

export default router;
