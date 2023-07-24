const express = require("express");
const Route = express.Router();
const userController = require("../controllers/UserController");
Route.post("/avatars", userController.getAvatar);
module.exports = Route;
