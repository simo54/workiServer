const express = require("express");
const route = express.Router();

const employer_controller = require("../controllers/employers");
const jobsController = require("../controllers/job");

route.get("/", employer_controller.getEmployer);
route.post("/create", employer_controller.createEmployer);

route.get("/jobs", jobsController.getJobs);
route.get("/jobs/:id", jobsController.getJobId);
route.post("/jobs/create", jobsController.createJob);

module.exports = route;
