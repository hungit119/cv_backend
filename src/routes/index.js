const authRoute = require("./authRoute");
function router(app) {
  app.use("/api/auth", authRoute);
}
module.exports = router;
