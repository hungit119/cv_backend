const mongoose = require("mongoose");

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
module.exports = { connect };
