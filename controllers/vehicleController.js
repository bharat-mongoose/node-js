const Vehicle = require("../models/vehicleModal");

exports.createVehicle = async (req, res) => {
  const { vehicleName, vehicleNo, availableSeat, totalSeat } = req.body;

  try {
    let vehicle = await Vehicle.findOne({ vehicleNo });

    if (vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "vehicle already registered" });
    }
    vehicle = new Vehicle({
      vehicleName,
      vehicleNo,
      availableSeat,
      totalSeat,
    });
    vehicle.save();
    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
    // await vehicle.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get vehicle

exports.getVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find();

    if (!vehicles) {
      return res.status(400).json({
        success: false,
        message: "Vehicles not found",
        vehicles,
      });
    }
    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete vehicles

exports.deleteVehicles = async (req, res) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    await vehicle.deleteOne();
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update vehicle

exports.updateVehicle = async (req, res) => {
  try {
    const newVehicle = {
      vehicleName: req.body.vehicleName,
      vehicleNo: req.body.vehicleNo,
      availableSeat: req.body.availableSeat,
      totalSeat: req.body.totalSeat,
    };

    const existingVehicle = await Vehicle.findOne({
      vehicleNo: req.body.vehicleNo,
    });

    if (existingVehicle && existingVehicle._id.toString() !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number is already in use",
      });
    }
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, newVehicle);
    if (!vehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // await vehicle.save();
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
