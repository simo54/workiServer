const express = require("express");
const verifyAuthEmployer = require("../authentication/verifyAuthEmployer");
const route = express.Router();

const employer_controller = require("../controllers/employers");
const application_controller = require("../controllers/jobapplications");

route.get("/", employer_controller.getEmployer);
route.post("/create", employer_controller.createEmployer);
route.get("/employerIsAuthenticated", verifyAuthEmployer);

// Get applications filtered by company ID (every job is with the id of the employer that published it)
route.get("/applications/:id", application_controller.getJobsApplications);

route.get(
  "/applications/:id/:jobref/resume",
  application_controller.getResumeFromApplication
);

route.put("/:id/updateinfo", employer_controller.updateEmployer);
route.get("/:id", employer_controller.getEmployerById);

module.exports = route;
