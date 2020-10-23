const express = require("express");
const route = express.Router();

const user_controller = require("../controllers/user");
const jobapplication_controller = require("../controllers/jobapplications");

route.get("/", user_controller.getUsers);
route.post("/create", user_controller.createUser);

route.get("/jobapplications", jobapplication_controller.getJobsApplications);
route.post("/newjobapplication", jobapplication_controller.newJobApplication);

module.exports = route;
