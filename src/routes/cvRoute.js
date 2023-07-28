const express = require("express");
const Route = express.Router();
const cvController = require("../controllers/CvController");
Route.post("/createCv", cvController.createCv);
Route.get("/getAllByUserId", cvController.getAllByUserId);
Route.get("/getCvBySid", cvController.getCvBySid);
Route.post("/updateCv", cvController.updateCv);
Route.delete("/delete", cvController.delete);
Route.get("/getAllCv", cvController.getAllCv);
Route.get("/search", cvController.search);

module.exports = Route;
