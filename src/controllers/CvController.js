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
    } catch (error) {}
  }
}
module.exports = new CvController();
