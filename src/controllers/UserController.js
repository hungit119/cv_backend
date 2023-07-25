var cloudinary = require("cloudinary");
const User = require("../models/User");
const argon2 = require("argon2");
class UserController {
  getAvatar(req, res) {
    const { folder } = req.body;
    var options = {
      resource_type: "image",
      folder: `${folder}/avatar`,
      max_results: 10,
    };
    cloudinary.v2.api.resources(options, function (error, result) {
      if (error)
        res.status(400).json({
          message: error.message,
        });
      const images = result.resources.map((resource) => resource.url);
      res.json({
        success: true,
        message: "get avatar for user by emai",
        images,
      });
    });
  }
  async updateInfo(req, res) {
    try {
      const { sid } = req.body.userInfoData;
      const userInfo = req.body.userInfoData;
      delete userInfo.sid;
      await User.findOneAndUpdate({ sid }, { ...userInfo }).then(
        async (response) => {
          await User.findOne({ sid }).then((response) => {
            res.json({
              success: true,
              message: "Save changes successfully",
              user: response,
            });
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmNewPassword, sid } = req.body;
      const user = await User.findOne({ sid });
      const decodedPassword = await argon2.verify(user.password, oldPassword);
      if (!decodedPassword)
        return res.status(400).json({
          success: false,
          message: "Incorrect password!",
        });
      if (newPassword !== confirmNewPassword)
        return res.status(400).json({
          success: false,
          message: "Incorrect confirm password!",
        });
      const hashPassword = await argon2.hash(newPassword);
      await User.updateOne({ sid }, { password: hashPassword }).then(
        (response) => {
          res.json({
            success: true,
            message: "Change password successfully",
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
