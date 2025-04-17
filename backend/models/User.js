const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true, // Ensures no leading/trailing spaces
      lowercase: true, // Ensures email is stored in lowercase
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"], // Regex for email validation
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and set it to the field
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Set token expiration time (1 hour)
  this.resetPasswordExpires = Date.now() + 3600000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
