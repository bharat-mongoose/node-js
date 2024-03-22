const express = require("express");
const passport = require("passport");
require("../config/passport");

const router = express.Router();
// google login

router.get("/google-login", (req, res) => {
  res.render("../login.ejs");
});

router.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/google-login",
  })
);

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/google-login");
};

router.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("../dashboard.ejs", { name: req.user.displayName });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/google-login");
  });
});
module.exports = router;
