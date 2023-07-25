const express = require("express");
const Route = express.Router();
const userController = require("../controllers/UserController");
Route.post("/avatars", userController.getAvatar);
Route.post("/updateInfo", userController.updateInfo);
Route.post("/changePassword", userController.changePassword);
module.exports = Route;
