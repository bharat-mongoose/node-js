const express = require("express");
const passport = require("passport");
require("../config/passport");

const router = express.Router();

router.get("/facebook-login", function (req, res) {
  res.render("../index.ejs"); // load the index.ejs file
});

router.get("/profile", checkAuthenticated, function (req, res) {
  res.render("../profile.ejs", {
    user: req.user, // get the user out of session and pass to template
  });
});

router.get("/error", checkAuthenticated, function (req, res) {
  res.render("pages/error.ejs");
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);
module.exports = router;
