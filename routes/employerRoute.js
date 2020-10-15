const express = require("express");
const route = express.Router();

const employer_controller = require("../controllers/employers");

route.get("/", employer_controller.getEmployer);
route.post("/create", employer_controller.createEmployer);

module.exports = route;
