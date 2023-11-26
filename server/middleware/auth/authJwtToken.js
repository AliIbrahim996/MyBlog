const jwt = require("jsonwebtoken");
const User = require("../../models/user");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    // Find the user by the decoded id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found!",
      });
    }
    // Set req.user to the founded user
    req.user = user;
    next();
  });
};

module.exports = [verifyToken];
