const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  //   const authHeader = req.header["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not provided",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid Token",
      });
    }
    req.user = user;
    next();
  });
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.user.role} is not allowed access to this`,
      });
    }
    next();
  };
};

exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

exports.ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/log");
  }
};
