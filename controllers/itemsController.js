//Any logic that involves CRUD operations on the Item schema goes here
import Item from "../models/Item.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import { DateTime } from "luxon";
//display all items present in the user's list.
const getAllItems = async (req, res) => {
  const { name, category, sort } = req.query;
  const queryObject = { addedBy: req.user.Id };

  //console.log(queryObject);

  if (category && category !== "all") {
    queryObject.category = category;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let items = Item.find(queryObject).sort({ expiresOn: "asc" });

  if (sort === "expiring soon-later") {
    items = items.sort({ expiresOn: "asc" });
  }

  if (sort === "expiring later-soon") {
    items = items.sort({ expiresOn: "desc" });
  }

  if (sort === "newest-oldest") {
    items = items.sort({ createdAt: "asc" });
  }

  if (sort === "oldest-newest") {
    items = items.sort({ createdAt: "desc" });
  }

  let finalItems = await items;

  finalItems = finalItems.filter((item) => item.status === "mylist");
  return res
    .status(StatusCodes.OK)
    .json({ items: finalItems, totalItems: finalItems.length, numPages: 1 });
};

//add an item to the user's list
const createItem = async (req, res) => {
  const { status, category, name, quantity, unit, expiresOn } = req.body;

  if (!category || !name || !quantity || !unit || !expiresOn || !status) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.addedBy = req.user.Id;
  const item = await Item.create(req.body);

  return res.status(StatusCodes.OK).json({ item: item });
};

//delete item from the user's list
const deleteItem = async (req, res) => {
  const deleteItemId = req.params.id;

  const item = await Item.findOne({ _id: deleteItemId });
  if (!item) {
    throw new BadRequestError("No item with this id was found");
  }

  if (req.user.Id !== item.addedBy.toString()) {
    throw new UnauthenticatedError("Not allowed to access this route");
  }

  const response = await Item.deleteOne({ _id: deleteItemId });
  if (response.deletedCount !== 1) {
    throw new BadRequestError("Something went wrong when deleting the item");
  }
  return res.status(StatusCodes.OK).json({ msg: "Item deleted" });
};

//update an item in the list. Can edit properties like quantity, name, category, unit, but not expiry
const updateItem = async (req, res) => {
  const editItemId = req.params.id;
  const { category, name, quantity, unit } = req.body;
  if (!category || !name || !quantity || !unit) {
    throw new BadRequestError("Please provide all values");
  }

  const item = await Item.findOne({ _id: editItemId });
  if (!item) {
    throw new NotFoundError("No such item found");
  }

  const updateReq = { quantity, unit };

  const updatedItem = await Item.findOneAndUpdate(
    { _id: editItemId },
    updateReq,
    { new: true, runValidators: true }
  );

  const reqUserId = req.user.Id;
  const itemAddedBy = updatedItem.addedBy.toString();

  if (reqUserId !== itemAddedBy) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
  return res.status(StatusCodes.OK).json({ updatedItem: updatedItem });
};

//displays stats like number of items donated, claimed, and number of items about to expire. maybe also a chart of monthly items donated
const showStats = async (req, res) => {
  return res.send("showStats");
};

//display all items present in the user's list with a form option to enter the pickup date,time,location and a button to donate(submit to global list) selected item
//In my opinion this function should be present here as it involves modifying the forDonation property of the item schema
const donateItem = async (req, res) => {
  const donateItemId = req.params.id;
  const { pickupTime, pickupLocation } = req.body;
  if (!pickupTime || !pickupLocation) {
    throw new BadRequestError("Please provide all values");
  }

  const item = await Item.findOne({ _id: donateItemId });
  if (!item) {
    throw new NotFoundError("No such item found");
  }

  let datetime = DateTime.fromISO(pickupTime);
  datetime = datetime.toISO();

  const updateReq = { pickupTime: datetime, pickupLocation, status: "donated" };

  const donatedItem = await Item.findOneAndUpdate(
    { _id: donateItemId },
    updateReq,
    { new: true, runValidators: true }
  );

  const reqUserId = req.user.Id;
  const itemAddedBy = donatedItem.addedBy.toString();

  if (reqUserId !== itemAddedBy) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  return res.status(StatusCodes.OK).json({ item: donatedItem });
};

//displays all items that the user has claimed from the global donation list
const getClaimedItems = async (req, res) => {
  const { name, category, sort } = req.query;
  const queryObject = { claimedBy: req.user.Id };
  queryObject.status = "claimed";

  //console.log(queryObject);

  if (category && category !== "all") {
    queryObject.category = category;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let items = Item.find(queryObject).sort({ expiresOn: "asc" });

  if (sort === "expiring soon-later") {
    items.sort({ expiresOn: "asc" });
  }

  if (sort === "expiring later-soon") {
    items.sort({ expiresOn: "desc" });
  }

  if (sort === "oldest-newest") {
    let final = await items;

    console.log(final);
    final.sort((a, b) => {
      return a.createdAt.toString() < b.pickupTime.toString()
        ? -1
        : a.createdAt.toString() > b.createdAt.toString()
        ? 1
        : 0;
    });
    return res
      .status(StatusCodes.OK)
      .json({ items: final, totalItems: final.length, numPages: 1 });
  }

  if (sort === "newest-oldest") {
    const final = await items;
    final.sort((a, b) => {
      return a.createdAt < b.pickupTime
        ? -1
        : a.createdAt > b.createdAt
        ? 1
        : 0;
    });
    return res
      .status(StatusCodes.OK)
      .json({ items: final, totalItems: final.length, numPages: 1 });
  }

  if (sort === "pickup soon") {
    const final = await items;
    final.sort((a, b) => {
      return a.pickupTime < b.pickupTime
        ? -1
        : a.pickupTime > b.pickupTime
        ? 1
        : 0;
    });
    return res
      .status(StatusCodes.OK)
      .json({ items: final, totalItems: final.length, numPages: 1 });
  }
  if (sort === "pickup later") {
    const final = await items;
    final.sort((a, b) => {
      return a.pickupTime > b.pickupTime
        ? -1
        : a.pickupTime < b.pickupTime
        ? 1
        : 0;
    });
    return res
      .status(StatusCodes.OK)
      .json({ items: final, totalItems: final.length, numPages: 1 });
  }

  const finalItems = await items;

  //finalItems = finalItems.filter((item) => item.status === "claimed");
  return res
    .status(StatusCodes.OK)
    .json({ items: finalItems, totalItems: finalItems.length, numPages: 1 });
};

//lets user claim an item from the global donation list, subject to a claimCounter. This method then adds the claimed item to the recepient's claimList, revealing the pickup time,date and location
//It then updates the donor's DonateItems list
const claimItem = async (req, res) => {
  //set item status to claimed (id from route param :id)
  //set claimedBy for that item, using req.user.Id

  const claimItemId = req.params.id;
  const item = await Item.findOne({ _id: claimItemId });

  if (!item) {
    throw new NotFoundError("No item found");
  }

  const updateReq = { status: "claimed", claimedBy: req.user.Id };

  const claimedItem = await Item.findOneAndUpdate(
    { _id: claimItemId },
    updateReq,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(StatusCodes.OK).json({ item: claimedItem });
};

const getDonationList = async (req, res) => {
  const { name, category, sort } = req.query;

  //console.log(queryObject);
  const queryObject = {};

  if (category && category !== "all") {
    queryObject.category = category;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let items = Item.find(queryObject).sort({ expiresOn: "asc" });

  if (sort === "expiring soon-later") {
    items.sort({ expiresOn: "asc" });
  }

  if (sort === "expiring later-soon") {
    items.sort({ expiresOn: "desc" });
  }

  let finalItems = await items;

  finalItems = finalItems.filter(
    (item) =>
      item.status === "donated" && item.addedBy.toString() !== req.user.Id
  );
  return res
    .status(StatusCodes.OK)
    .json({ items: finalItems, totalItems: finalItems.length, numPages: 1 });
};

const deleteMany = async (req, res) => {
  await Item.deleteMany({});
  res.send("deleted all items");
};

export {
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
};
