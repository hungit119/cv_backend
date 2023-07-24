const authRoute = require("./authRoute");
const cvRoute = require("./cvRoute");
const userRoute = require("./userRoute");
function router(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/cv", cvRoute);
  app.use("/api/user/", userRoute);
}
module.exports = router;
