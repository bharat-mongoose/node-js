const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // You can store the path or URL of the profile picture
  },
  contactNumber: {
    type: String,
  },
  drivingLic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "owner", "passenger"],
    default: "passenger",
  },
});

module.exports = mongoose.model("User", UserSchema);
