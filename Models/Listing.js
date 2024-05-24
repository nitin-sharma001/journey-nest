const mongoose = require("mongoose");
const Review = require("./Review");
require("dotenv").config();
const Listing = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  image: {
    type: String,
    default: process.env.DEFAULT_IMG,
    set: (img) => (img === "" ? process.env.DEFAULT_IMG : img),
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

Listing.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

module.exports = mongoose.model("Listing", Listing);
