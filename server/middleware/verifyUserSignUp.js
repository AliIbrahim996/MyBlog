const User = require("../models/user");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ statusCode: 400, message: "Failed! email is already in use!" });
  next();
};

module.exports = [checkDuplicateUsernameOrEmail];
