const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  loginStatus,
  updateUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.put("/updateUser", protect, updateUser);

module.exports = router;
