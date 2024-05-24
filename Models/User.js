const mongoose = require("mongoose");
const passport = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

userSchema.plugin(passport);

module.exports = mongoose.model("User", userSchema);
