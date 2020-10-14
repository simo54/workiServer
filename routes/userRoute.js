const express = require("express");
const route = express.Router();

const user_controller = require("../controllers/user");

route.get("/", user_controller.getUsers);
route.post("/create", user_controller.createUser);

module.exports = route;
