var express = require("express");
var router = express.Router();
const {
  createUserController,
  updateUserByEmailController,
  deleteUserController,
  loginUserController,
} = require("../controllers/usersController");

const {
  checkDuplicateUsernameOrEmail,
  verifyToken,
} = require("../middleware/authIndex");

router.post("/signup", checkDuplicateUsernameOrEmail, createUserController);
router.post("/login", loginUserController);
router.delete("/", verifyToken, deleteUserController);
router.patch("/", verifyToken, updateUserByEmailController);

module.exports = router;
