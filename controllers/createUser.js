const User = require("../Models/User");

exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    // await newUser.save();

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User Registered Successfully !");
      res.redirect("/listings");
    });
  } catch (err) {
    console.log("Error While Creating User", err);
    req.flash("error", "username is already exits !");
    res.redirect("/signup");
  }
};
