const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

require("./config/passport");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const vehicle = require("./routes/vehicleRoutes");
const googleLogin = require("./routes/googleLoginRoutes");
const facebookLogin = require("./routes/facebookLogin");
const errorHandler = require("./config/errorHandler");
app.use(errorHandler);

app.use("/api/v1", auth);
app.use("/api/v1", user);
app.use("/api/v1", vehicle);
app.use("/", googleLogin);
app.use("/", facebookLogin);

module.exports = app;
