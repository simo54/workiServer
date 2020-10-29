const express = require("express");
const route = express.Router();

const user_controller = require("../controllers/user");
const jobapplication_controller = require("../controllers/jobapplications");
const verifyAuthUser = require("../authentication/verifyAuthUser");

route.get("/", user_controller.getUsers);

// Route for signup
route.post("/create", user_controller.createUser);

// Route for checking if user is authenticated in order to access the page
route.get("/userIsAuthenticated", verifyAuthUser); // verify token and sessions uuid
route.get("/:id", user_controller.getUserById);

// Route for applying for job
// route.get("/jobapplications", jobapplication_controller.getJobsApplications);
route.post("/newjobapplication", jobapplication_controller.newJobApplication);

module.exports = route;
