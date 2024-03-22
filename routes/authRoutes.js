const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { check } = require("express-validator");
const { upload } = require("../middleware/upload");
const router = express.Router();

router.post("/register-user", upload.single("profilePicture"), register);
router.post(
  "/login-user",
  [
    // Input validation using express-validator
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  login
);
router.get("/logout", logout);

module.exports = router;
