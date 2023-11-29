const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isLoggedIn: {
    type: Boolean,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  resetCode: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// generating a hash
UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// Custom method to compare and validate password for logging in
UserSchema.methods.isPasswordCorrect = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
