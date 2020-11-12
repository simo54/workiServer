const express = require("express");
const verifyAuthEmployer = require("../authentication/verifyAuthEmployer");
const route = express.Router();

// Route to controllers
const employer_controller = require("../controllers/employers");
const application_controller = require("../controllers/jobapplications");

// Route to URL
route.get("/", employer_controller.getEmployer);
route.post("/create", employer_controller.createEmployer);
route.get("/employerIsAuthenticated", verifyAuthEmployer);

// Get applications filtered by company ID (every job is with the id of the employer that published it)
route.get("/applications/:id", application_controller.getJobsApplications);

// Getting the resume from the application open on the employer's private area
route.get(
  "/applications/:id/:jobref/resume",
  application_controller.getResumeFromApplication
);

// Update employer profile with new info
route.put("/:id/updateinfo", employer_controller.updateEmployer);
route.put("/:id/logo", employer_controller.updateLogo);

// Get employer by id
route.get("/:id", employer_controller.getEmployerById);

// Get logo from a certain employer
route.get("/:id/getlogo", employer_controller.getLogo);

module.exports = route;
