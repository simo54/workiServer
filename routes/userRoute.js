const express = require("express");
const route = express.Router();

const user_controller = require("../controllers/user");
const jobapplication_controller = require("../controllers/jobapplications");
const verifyAuthUser = require("../authentication/verifyAuthUser");

route.get("/", user_controller.getUsers);
route.post("/create", user_controller.createUser);

route.get("/userIsAuthenticated", verifyAuthUser); // verify token and sessions uuid

route.get("/jobapplications", jobapplication_controller.getJobsApplications);
route.post("/newjobapplication", jobapplication_controller.newJobApplication);

module.exports = route;
