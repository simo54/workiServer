const bcrypt = require("bcrypt");
const Job = require("../models/Job");

const controller = {
  getJobs: async (req, res) => {
    console.log("beginning of getJobs");
    Employer.findAll()
      .then((results) => {
        res.send(results);
        res.sendStatus(200)
      })
      .catch((err) => console.log(err));
  },
  createJob: async (req, res) => {
    console.log("beginning of createJob");
    const {
        jobtitle,
        employmenttype,
        introduction,
        role,
        requirements,
        address,
        zip,
        city,
        country,
        contactdetails
    } = req.body;
    if (!jobtitle || !employmenttype ||!introduction ||!role ||!requirements ||!address ||!zip ||!city ||!country ||!contactdetails) {
      res.sendStatus(400);
      return;
    }
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        await Employer.create({
            jobtitle,
            employmenttype,
            introduction,
            role,
            requirements,
            address,
            zip,
            city,
            country,
            contactdetails
        });
        res.sendStatus(200);
      });
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;
