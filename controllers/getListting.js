const Listing = require("../Models/Listing");

exports.getAllListing = async (req, res) => {
  try {
    const Listings = await Listing.find({});

    res.render("./listings/index", { Listings });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
      message: "Listing Found Failed !",
    });
  }
};

exports.getListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    res.render("./listings/show", { listing });
  } catch (err) {
    console.log(err);
  }
};

exports.filter = async(req,res)=>{

    
  try {
    const query_data=req.query.q;
    const Listin = await Listing.find({});
    const Listings= Listin.filter((value)=>{
      // return value.title==query_data;
      // return includesIgnoreCase(value.title, );
      return  value.title.toLowerCase().includes(query_data.toLowerCase());
     
    })
    console.log(Listings);
    if(Listings.length!=0){
    res.render("./listings/index", { Listings });
    }
    else{
      res.render("./listings/nodata");
    }
  } catch (err) {
    res.status(400).json({  
      success: false,
      error: err,
      message: "Listing Found Failed !",
    });
  }

};