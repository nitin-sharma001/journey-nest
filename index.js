const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const flash = require("connect-flash");
const methodOverride = require("method-override");
const dbConnect = require("./config/database");
const routes = require("./routes/route");
const userRoute = require("./routes/userRoutes");
const filter = require("./routes/filter");

const session = require("express-session");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./Models/User");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(
  session({
    secret: "kuchbhi",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", routes);

app.use("/", userRoute);
app.use("/data",filter);

app.listen(process.env.PORT, () => {
  console.log("Server is started at 3000...");
});

dbConnect();
