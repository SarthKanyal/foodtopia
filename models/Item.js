import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please select item category"],
      enum: ["Fruit", "Vegetable", "Dairy", "Non-perishable"],
    },
    name: {
      type: String,
      required: [true, "Please enter item name"],
      maxLength: 100,
    },
    quantity: {
      type: Number,
      required: [true, "Please enter item quantity"],
    },
    unit: {
      type: String,
      required: [true, "Please select a unit"],
      enum: ["kg", "lb", "ml", "units", "l", "gm"],
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: "String",
      enum: ["mylist", "claimed", "donated"],
    },
    claimedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    expiresOn: {
      type: Date,
      required: [true, "Please provide an expiry date"],
    },
    pickupLocation: {
      type: String,
      maxLength: 255,
    },
    pickupTime: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
