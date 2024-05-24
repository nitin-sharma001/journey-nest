let data = require("./data");

const Listing = require("../Models/Listing");

const dbConnect = require("../config/database");

const initDB = async () => {
  data = data.map((obj) => ({
    ...obj,
    owner: "661e872fe2f0c04b3b51f9cb",
  }));
  await Listing.insertMany(data);

  console.log("Data was saved");
};

dbConnect();
initDB();
