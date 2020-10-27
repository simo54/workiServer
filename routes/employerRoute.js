const express = require("express");
const verifyAuthEmployer = require("../authentication/verifyAuthEmployer");
const route = express.Router();

const employer_controller = require("../controllers/employers");

route.get("/", employer_controller.getEmployer);
route.post("/create", employer_controller.createEmployer);
route.get("/employerIsAuthenticated", verifyAuthEmployer);

module.exports = route;
