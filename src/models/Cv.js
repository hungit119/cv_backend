const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cv = new Schema(
  {
    sid: { type: String, unique: true, required: true },
    userInfor: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cvs", Cv);
