const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer", "vendor"],
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  bank_account: {
    type: String,
    required: false,
  },
  gstNumber: { type: String, required: false },
});

module.exports = mongoose.model("User", UserSchema);
