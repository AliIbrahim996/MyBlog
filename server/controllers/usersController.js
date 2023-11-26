const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUserController = async (req, res) => {
  try {
    let { firstName, lastName, email, password, repeatPassword } = req.body;
    if (!email || !password || !repeatPassword || !firstName || !lastName)
      return res.status(400).json({
        statusCode: 400,
        message: "Some fields are empty!\nCheck your input!",
      });

    if (password.length < 8)
      return res.status(400).json({
        statusCode: 400,
        message: "The password needs to be at least 8 characters long.",
      });

    if (password !== repeatPassword)
      return res.status(400).json({
        statusCode: 400,
        message: "Enter the same password twice for verification.",
      });

    // Create User
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      statusCode: 201,
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (err) {
    // Server Error
    return res.status(500).json({
      success: false,
      user: null,
      message: err.message,
    });
  }
};

const updateUserByEmailController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser._id != req.user._id)
        return res.status(400).json({
          statusCode: 400,
          message: "An account with this email already exists!",
        });
    }

    let updates = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    // Find user by id and updates with the required fields
    const result = await User.findOneAndUpdate(
      req.user,
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    );

    // Send the response
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        data: null,
        message: "No user found with id: " + req.user._id,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        id: result._id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      },
      message: "User with id: " + req.user._id + " updated!",
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

const deleteUserController = async (req, res) => {
  try {
    // Find user by ID and DELETE
    const result = await User.findOneAndDelete(req.user).exec();

    // If no results found, return user not found
    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        data: null,
        message: "No user found with id: " + req.user._id,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: result,
        message: "User with id: " + req.user._id + " deleted Successfully!",
      });
    }
  } catch (err) {
    // Server Error
    res.status(500).json({
      statusCode: 500,
      success: false,
      data: null,
      message: err.message,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({
        statusCode: 400,
        message: "Some fields are empty!\nCheck your input!",
      });

    // Check if email/user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        statusCode: 404,
        success: false,
        data: null,
        message: "No account with email:" + email + " has been registered!",
      });

    // check for password validity
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({
        statusCode: 401,
        success: false,
        data: null,
        message: "Invalid password!",
      });

    const secretKey = process.env.SECRET || "MySecretKey1";
    const token = jwt.sign({ id: user._id }, secretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    });
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      { isLoggedIn: true },
      {
        new: true,
      }
    );

    // Send the response
    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        token,
        user: {
          _id: result._id,
          name: result.firstName + " " + result.lastName,
          isLoggedIn: result.isLoggedIn,
        },
      },
      message: "Successfully login user",
    });
  } catch (err) {
    // Catching server error
    res.status(500).json({ success: false, data: null, message: err.message });
  }
};

module.exports = {
  createUserController,
  updateUserByEmailController,
  deleteUserController,
  loginUserController,
};
