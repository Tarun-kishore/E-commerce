const mongoose = require("mongoose");
const validator = require("validator");
const Product = require("./products");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: {
      type: Date,
      validate(value) {
        if (validator.isAfter(value.toISOString()))
          throw new Error("Date is in future");
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is not valid");
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("remove", async function (next) {
  try {
    await Product.deleteMany({ createdBy: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
