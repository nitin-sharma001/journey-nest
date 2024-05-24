const mongoose = require("mongoose");

require("dotenv").config();

const db = () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/JourneyNest")
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB is connected....");
    })
    .catch((err) => {
      console.log("DB Connection Failure", err);
    });
};

module.exports = db;
