const Listing = require("../Models/Listing");

exports.createListings = async (req, res) => {
  try {
    res.render("./listings/new");
  } catch (err) {
    console.log("error in new route", err);
  }
};

exports.createListing = async (req, res) => {
  try {
    const { title, desc, image, price, location, country } = req.body;
    // console.log(title);

    let img_url = req.file.path;

    const newlisting = new Listing({
      title: title,
      desc: desc,
      image: img_url,
      price: price,
      location: location,
      country: country,
    });

    newlisting.owner = req.user._id;

    await newlisting.save();

    req.flash("success", "New Listing Created Successfully !");

    res.redirect("/listings");
  } catch (err) {
    console.log("error in creting listing", err);
  }
};
