const express = require("express");
const {
  createVehicle,
  getVehicles,
  deleteVehicles,
  updateVehicle,
} = require("../controllers/vehicleController");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-vehicle",
  authenticateToken,
  authorizeRoles("admin", "owner"),
  createVehicle
);

router.get(
  "/vehicles",
  authenticateToken,
  authorizeRoles("admin"),
  getVehicles
);

router.delete(
  "/delete-vehicle/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteVehicles
);

router.put(
  "/update-vehicle/:id",
  authenticateToken,
  authorizeRoles("admin", "owner"),
  updateVehicle
);

module.exports = router;
