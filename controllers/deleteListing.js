const Listing = require("../Models/Listing");

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission to edit !");
      return res.redirect(`/listings/${id}`);
    }

    const deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing delete Successfully !");

    console.log(deleteListing);
    res.redirect("/listings");
  } catch (err) {
    console.log("err while deleing listingg", err);
  }
};
