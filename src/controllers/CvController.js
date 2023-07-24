const Cv = require("../models/Cv");
const { v4 } = require("uuid");
class CvController {
  async createCv(req, res) {
    // validate params
    try {
      const formCv = req.body;
      const rs = Object.values(formCv?.userInfo).some((data) => data === "");
      if (rs)
        res.status(503).json({
          message: "Invalid Params",
        });
      const newCv = new Cv({
        sid: v4(),
        ...formCv,
      });
      await newCv
        .save()
        .then((savedCv) => {
          return res.json({
            success: true,
            message: "Save cv successfully.",
            savedCv,
          });
        })
        .catch((error) => {
          res.status(403).json({ message: "save record failed", error });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = new CvController();
