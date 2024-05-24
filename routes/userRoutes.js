const express = require("express");
const { createUser } = require("../controllers/createUser");
const { loginUser } = require("../controllers/loginUser");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/loggedIn");

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs");
  })
  .post(createUser);

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginUser
  );

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Loggout Successfully !");
    res.redirect("/listings");
  });
});

module.exports = router;
