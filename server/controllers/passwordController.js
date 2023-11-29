const User = require("../models/user");
const uuid = require("uuid");
const sendCodeViaEmail = require("../controllers/helpers/sendCodeViaEmail");

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;
  let user = User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ statusCode: 404, message: "User not found!" });

  const resetCode = uuid.v4();
  user.resetCode = resetCode;
  await user.save();
  sendCodeViaEmail(email, resetCode);
  return res
    .status(200)
    .json({ statusCode: 200, message: `Reset Code sent to ${email}` });
};

const resetPasswordController = async (req, res) => {
  try {
    // Retrieve the user object from the request
    const result = await User.findOneAndUpdate(
      req.user,
      { $set: { password: req.body.newPassword } },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    );

    if (!result)
      return res.status(404).json({
        statusCode: 404,
        success: false,
        data: null,
        message: `Failed to update user ${req.user._id}`,
      });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: result,
      message: "Password has been changed!",
    });
  } catch (err) {
    return res.status(200).json({
      statusCode: 500,
      success: false,
      data: null,
      message: err.message,
    });
  }
};

module.exports = { forgetPasswordController, resetPasswordController };
