//Any logic that involves CRUD operations on the Item schema goes here

//display all items present in the user's list.
const getAllItems = async (req, res) => {
  return res.send("getAlltems");
};

//add an item to the user's list
const createItem = async (req, res) => {
  return res.send("addItem");
};

//delete item from the user's list
const deleteItem = async (req, res) => {
  return res.send("deleteItem");
};

//update an item in the list. Can edit properties like quantity, name, category. but maybe not expiry
const updateItem = async (req, res) => {
  return res.send("updateItem");
};

//displays stats like number of items donated, claimed, and number of items about to expire. maybe also a chart of monthly items donated
const showStats = async (req, res) => {
  return res.send("showStats");
};

//display all items present in the user's list with a form option to enter the pickup date,time,location and a button to donate(submit to global list) selected item
//In my opinion this function should be present here as it involves modifying the forDonation property of the item schema
const donateItem = async (req, res) => {
  return res.send("donateItem");
};

//displays all items that the user has claimed from the global donation list
const getClaimedItems = async (req, res) => {
  return res.send("getClaimedItems");
};

//lets user claim an item from the global donation list, subject to a claimCounter. This method then adds the claimed item to the recepient's claimList, revealing the pickup time,date and location
//It then updates the donor's DonateItems list
const claimItem = async (req, res) => {
  return res.send("claimItem");
};

const getDonatedItems = async (req, res) => {
  return res.send("getDonatedItems");
};

export { getAllItems, createItem, updateItem, deleteItem, showStats };
