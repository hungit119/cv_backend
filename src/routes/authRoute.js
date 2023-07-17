const express = require("express");
const Route = express.Router();
const authController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken");
Route.post("/login", authController.login);
Route.post("/register", authController.register);
Route.get("/loadUser", verifyToken, authController.loadUser);
Route.post("/google-login", authController.googleLogin);
module.exports = Route;