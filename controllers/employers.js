const bcrypt = require("bcrypt");
const Employer = require("../models/Employer");

const controller = {
  getEmployer: async (req, res, next) => {
    console.log("beginning of employer");
    await Employer.findAll()
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  createEmployer: async (req, res, next) => {
    console.log("beginning of createEmployer");
    const {
      companyname,
      firstname,
      lastname,
      middlename,
      logo,
      email,
      mobile,
      address,
      city,
      zip,
      country,
      companysize,
      password,
    } = req.body;
    if (!email || !zip || !country || !password || !companysize) {
      res.sendStatus(400);
      return;
    }
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        await Employer.create({
          companyname,
          firstname,
          lastname,
          middlename,
          logo,
          email,
          mobile,
          address,
          city,
          zip,
          country,
          companysize,
          password: hash,
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
