const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../utils/loggedIn");

const { getAllListing, getListing} = require("../controllers/getListting");
const {
  createListing,
  createListings,
} = require("../controllers/createListing");
const { updateListing, updateRoute } = require("../controllers/updateListing");
const { deleteListing } = require("../controllers/deleteListing");
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController");

const multer = require("multer");
const { storage } = require("../utils/cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .post(isLoggedIn, upload.single("image"), createListing)
  .get(getAllListing);

router.get("/new", isLoggedIn, createListings);

router
  .route("/:id")
  .get(getListing)
  .post(isLoggedIn, upload.single("image"), updateListing)
  .delete(isLoggedIn, deleteListing);

router.get("/:id/edit", isLoggedIn, updateRoute);

router.post("/:id/reviews", isLoggedIn, createReview);
router.delete("/:id/reviews/:reviewId", isLoggedIn, deleteReview);
 


module.exports = router;
