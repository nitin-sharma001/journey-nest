exports.isLoggedIn = (req, res, next) => {
  // console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("success", "You must be logged in to create listing !");
    return res.redirect("/login");
  }
  next();
};

exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
