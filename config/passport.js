const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/callback",
      passReqToCallback: true,
    },
    authUser
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_ID,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser((user, done) => {
  // User.findById(id, (err, user) => done(err, user));

  done(null, user);
});
