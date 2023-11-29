var express = require("express");
var router = express.Router();
const {
  createUserController,
  updateUserByEmailController,
  deleteUserController,
  loginUserController,
} = require("../controllers/usersController");

const {
  forgetPasswordController,
  resetPasswordController,
} = require("../controllers/passwordController");

const {
  checkDuplicateUsernameOrEmail,
  verifyToken,
  verifyResetCode,
} = require("../middleware/authIndex");

router.post("/signup", checkDuplicateUsernameOrEmail, createUserController);
router.post("/login", loginUserController);
router.delete("/", verifyToken, deleteUserController);
router.patch("/", verifyToken, updateUserByEmailController);
router.post("/forget-password", forgetPasswordController);
router.post("/reset-password", verifyResetCode, resetPasswordController);

module.exports = router;
