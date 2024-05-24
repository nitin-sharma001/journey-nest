const Listing = require("../Models/Listing");

exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("./listings/edit", { listing });
  } catch (err) {
    console.log(err);
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, image, price, country, location } = req.body;

    const listing = await Listing.findById(id);

    let img_url = req.file.path;

    if (!listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission to edit !");
      return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(
      id,
      {
        title: title,
        desc: desc,
        image: img_url,
        price: price,
        location: location,
        country: country,
      },
      { new: true }
    );

    // console.log(listing);
    req.flash("success", " Listing Updated Successfully !");

    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log(err);
  }
};
