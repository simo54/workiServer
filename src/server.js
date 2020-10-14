require("dotenv").config();
require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const path = require("path");

const controllerIndex = require("../routes/userRoute");

// const logingenerateAuth = require("../authentication/generateAuth");

// const generateAuth = require("./authentication/generateAuth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Prevent cors-error from local client-server requests
app.use(cors());
app.use(cors());

app.use("/", controllerIndex);
app.use("/create", controllerIndex);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
