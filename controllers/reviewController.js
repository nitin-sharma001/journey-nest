const Review = require("../Models/Review");
const Listing = require("../Models/Listing");

exports.createReview = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created Successfully !");

    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  let review = await Review.findById(reviewId);

  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You can't delete review !");
    return res.redirect(`/listings/${id}`);
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/listings/${id}`);
};
