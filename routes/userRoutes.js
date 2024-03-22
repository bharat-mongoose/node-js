const express = require("express");
const {
  getUsers,
  deletUser,
  updateUser,
} = require("../controllers/userController");
const { upload } = require("../middleware/upload");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/users", authenticateToken, authorizeRoles("admin"), getUsers);

router.put(
  "/update-user/:id",
  authenticateToken,
  authorizeRoles("admin"),
  upload.single("profilePicture"),
  updateUser
);

router.post(
  "/delete-user/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deletUser
);

module.exports = router;
