const User = require("../../models/user");

const verifyResetCode = async (req, res, next) => {
  const { email, resetCode } = req.body;
  const user = User.findOne({ email, resetCode });
  if (!user)
    return res
      .status(401)
      .json({ statusCode: 401, message: "Invalid reset code!" });

  req.user = user;
  next();
};

module.exports = [verifyResetCode];
