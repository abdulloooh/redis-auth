const _ = require("lodash");
const mongoose = require("mongoose");
// const crypto = require("crypto");

const public_fields = ["email", "restricted"];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      minlength: 5,
      maxlength: 255,
      required: "Please fill in an email",
    },
    password: {
      type: String,
      maxlength: 255,
    },
    restricted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.transformUserEntity = function () {
  return _.pick(this, public_fields);
};

// userSchema.methods.generatePasswordReset = function () {
//   this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordExpires = Date.now() + 900000; //expires in 15 minutes
// };

module.exports = mongoose.model("User", userSchema);
