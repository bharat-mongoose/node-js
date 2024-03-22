const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");

// get users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      $where: function () {
        return this.role !== "admin";
      },
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update user

exports.updateUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const imagePath = path.extname(req.file.path);
    const image = Date.now() + imagePath;

    const newUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password ? password : user.password,
      contactNumber: req.body.contactNumber,
      profilePicture: image ? image : user.profilePicture,
      drivingLic: user.drivingLic,
      role: req.body.role,
    };
    let user;
    try {
      user = await User.findByIdAndUpdate(req.params.id, newUserData);
    } catch (error) {
      // Check if the error is due to duplicate email
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use",
        });
      }
      throw error; // re-throw other errors
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      newUserData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete user
exports.deletUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
