const mongoose = require("mongoose");
var cloudinary = require("cloudinary").v2;

const url = "mongodb://localhost:27017/cv";

async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connected !");
  } catch (error) {
    console.log("error =", error.message);
    process.exit(1);
  }
}
function configCloudinary() {
  cloudinary.config({
    cloud_name: "dhhahwrmr",
    api_key: "219318624784124",
    api_secret: "Y-KQxQdcYCL_intHvHjwwIgO1IY",
  });
}

module.exports = { connect, configCloudinary };
