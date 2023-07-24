var cloudinary = require("cloudinary");
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
}
module.exports = new UserController();
