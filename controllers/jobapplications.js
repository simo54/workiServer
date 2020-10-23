const bcrypt = require("bcrypt");
const JobApplication = require("../models/JobApplication");

const controller = {
  getJobsApplications: async (req, res) => {
    JobApplication.findAll({})
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  newJobApplication: async (req, res) => {
    const {
      firstname,
      lastname,
      middlename,
      dateofbirth,
      email,
      mobile,
      address,
      city,
      zip,
      country,
      coverletter,
      resume,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !mobile ||
      !coverletter
      //   !resume
    ) {
      res.sendStatus(400);
      console.log("something is wrong here");
      return;
    }
    try {
      await JobApplication.create({
        firstname,
        lastname,
        middlename,
        dateofbirth,
        email,
        mobile,
        address,
        city,
        zip,
        country,
        coverletter,
        resume,
      });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;
