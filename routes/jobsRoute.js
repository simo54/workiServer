const express = require("express");
const route = express.Router();

const jobsController = require("../controllers/job");

route.get("/", jobsController.getJobs);
route.get("/:id", jobsController.getJobId);
route.get("/company/:id", jobsController.getJobRelated);
route.post("/create", jobsController.createJob);

module.exports = route;
