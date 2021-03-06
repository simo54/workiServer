require("dotenv").config();
require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Format json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User and Employer Login
const userlogin = require("../authentication/userLoginAuth");
const employerlogin = require("../authentication/employerLoginAuth");

// Controllers
const userController = require("../routes/userRoute");
const employerController = require("../routes/employerRoute");
const jobsController = require("../routes/jobsRoute");

// ======= Prevent cors-error from local client-server requests
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://workiforpeople.herokuapp.com",
    methods: "GET, POST, PUT, DELETE, HEAD",
    allowHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    exposedHeaders: "Content-Range,X-Content-Range",
    preflightContinue: true,
    credentials: true,
  })
);

// Routing
app.use("/user", userController);
app.use("/employer", employerController);
app.use("/jobs", jobsController);

// Login user and employer
app.post("/login/user", userlogin);
app.post("/login/useremployer", employerlogin);

// Server listening
app.listen(port, () => {
  console.log("Server running on port " + port);
});
