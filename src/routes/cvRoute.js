const express = require("express");
const Route = express.Router();
const cvController = require("../controllers/CvController");
Route.post("/createCv", cvController.createCv);
Route.get("/getAllByUserId", cvController.getAllByUserId);
module.exports = Route;
