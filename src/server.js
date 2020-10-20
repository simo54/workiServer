require("dotenv").config();
require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// User and Employer Login
const userlogin = require("../authentication/userLoginAuth");
const employerlogin = require("../authentication/employerLoginAuth");
// User and Employer Login

// Controllers
const userController = require("../routes/userRoute");
const employerController = require("../routes/employerRoute");
const jobsController = require("../routes/jobsRoute");
// Controllers

// Prevent cors-error from local client-server requests
app.use(cors());
// Prevent cors-error from local client-server requests


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userController);
app.use("/employer", employerController);
app.use("/jobs", jobsController);

app.post("/login/user", userlogin);
app.post("/login/userEmployer", employerlogin);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
