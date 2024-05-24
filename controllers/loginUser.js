exports.loginUser = async (req, res) => {
  try {
    req.flash("success", "User Login Successfully !");

    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
  } catch (err) {
    req.flash("error", "Password or username is incorrect");
    res.redirect("/login");
  }
};
