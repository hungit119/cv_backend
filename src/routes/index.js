const authRoute = require("./authRoute");
const cvRoute = require("./cvRoute");
function router(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/cv", cvRoute);
}
module.exports = router;
