const express = require("express");
const router = express.Router();
const {filter } = require("../controllers/getListting");






router.get("/filter",filter);
module.exports = router;
