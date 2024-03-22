const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
  },
  availabelSeat: {
    type: Number,
    required: true,
  },
  totalSeat: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
