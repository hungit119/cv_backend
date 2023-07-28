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
  async getAllCv(req, res) {
    try {
      await Cv.find({})
        .then((response) => {
          res.json({
            success: true,
            message: "Get all cv by user sid",
            cvs: response,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getAllByUserId(req, res) {
    try {
      const { sid } = req.query;
      await Cv.find({ userId: sid })
        .then((response) => {
          res.json({
            success: true,
            message: "Get all cv by user sid",
            cvs: response,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getCvBySid(req, res) {
    try {
      const { sid } = req.query;
      await Cv.findOne({ sid })
        .then((response) => {
          res.json({
            success: true,
            message: "Get cv by sid",
            cv: response,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async search(req, res) {
    try {
      const { keyword } = req.query;
      await Cv.find({
        $or: [
          {
            "userInfo.fullname": {
              $regex: keyword.toLowerCase(),
              $options: "i",
            },
          },
          {
            "userInfo.email": {
              $regex: keyword.toLowerCase(),
              $options: "i",
            },
          },
          {
            "cvInfo.positionJob": {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }).then((response) => {
        res.json({
          success: true,
          message: "find cvs",
          cvs: response,
        });
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateCv(req, res) {
    try {
      const { sid } = req.query;
      const data = req.body;
      await Cv.updateOne({ sid }, { ...data })
        .then((response) => {
          res.json({
            success: true,
            message: "Update Cv done",
            cv: response,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const { sid } = req.query;
      await Cv.deleteOne({ sid })
        .then((response) => {
          res.json({
            success: true,
            message: "Delete successfully",
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = new CvController();
