const User = require("../models/user");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) res.status(500).json({ statusCode: 500, message: err });
    if (user)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Failed! email is already in use!" });
    next();
  });
};

module.exports = [checkDuplicateUsernameOrEmail];
