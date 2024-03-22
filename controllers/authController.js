const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    drivingLic,
    role,
  } = req.body;

  const imagePath = path.extname(req.file.path);
  const image = Date.now() + imagePath;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if (role == "owner") {
      user = new User({
        firstName,
        lastName,
        email,
        password,
        profilePicture: image,
        contactNumber,
        drivingLic,
        role,
      });
    } else {
      user = new User({
        firstName,
        lastName,
        email,
        password,
        profilePicture: image,
        contactNumber,
        role,
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          token,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token).json({ success: true, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
