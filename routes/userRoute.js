const express = require("express");
const route = express.Router();

// ========================
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "../public/files/"),
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage }).single("resume");
// ========================

const user_controller = require("../controllers/user");
const jobapplication_controller = require("../controllers/jobapplications");
const verifyAuthUser = require("../authentication/verifyAuthUser");

route.get("/", user_controller.getUsers);

// Route for signup
route.post("/create", user_controller.createUser);

// Route for checking if user is authenticated in order to access the page
route.get("/userIsAuthenticated", verifyAuthUser); // verify token and sessions uuid

route.get("/:id", user_controller.getUserById);
route.put("/:id/updateinfo", user_controller.updateUser);
route.put("/:id/resume", user_controller.updateUserResume);
route.put("/:id/profilepicture", user_controller.updateProfilePicture);

// Route for applying for job
route.post("/newjobapplication", jobapplication_controller.newJobApplication);

module.exports = route;
