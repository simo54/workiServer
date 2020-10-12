require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3666;
const cors = require("cors");
const app = express();

// const generateAuth = require("./authentication/generateAuth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Prevent cors-error from local client-server requests
app.use(cors());

// app.use("/users", userRoutes); Route middleware

// app.post("/login", generateAuth);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
