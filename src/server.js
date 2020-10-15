require("dotenv").config();
require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const userlogin = require("../authentication/userLoginAuth");

// Controllers
const userController = require("../routes/userRoute");
const employerController = require("../routes/employerRoute");

// const logingenerateAuth = require("../authentication/generateAuth");

// const generateAuth = require("./authentication/generateAuth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Prevent cors-error from local client-server requests
app.use(cors());

app.use("/user", userController);
app.use("/employer", employerController);

app.post("/login/user", userlogin);
// app.post("/login/userEmployer", userlogin);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
