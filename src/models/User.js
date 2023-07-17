const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    sid: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    phone: { type: String },
    fisrtname: { type: String },
    lastname: { type: String },
    address: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", Users);
