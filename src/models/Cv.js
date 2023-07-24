const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cv = new Schema(
  {
    sid: { type: String, unique: true, required: true },
    userInfo: {
      address: { type: String },
      avatar: { type: String },
      dob: { type: String },
      email: { type: String },
      fullname: { type: String },
      gender: { type: String },
      phoneNumber: { type: String },
    },
    cvInfo: {
      positionJob: { type: String },
      academicLevel: Schema.Types.Mixed,
      activities: [Schema.Types.Mixed],
      careerGoals: Schema.Types.Mixed,
      certificates: [Schema.Types.Mixed],
      experiences: [Schema.Types.Mixed],
      favorites: [Schema.Types.Mixed],
      moreInfos: [Schema.Types.Mixed],
      prizes: [Schema.Types.Mixed],
      projectsJoined: [Schema.Types.Mixed],
      skills: [Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cvs", Cv);
