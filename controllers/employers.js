const bcrypt = require("bcrypt");
const Employer = require("../models/Employer");

const controller = {
  getEmployer: async (req, res, next) => {
    console.log("beginning of employer");
    await Employer.findAll()
      .then((results) => {
        res.send(results);
        // res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  getEmployerById: async (req, res, next) => {
    console.log("beginning of getEmployerById");
    const { id } = req.params;
    await Employer.findOne({
      where: { id: req.params.id },
    })
      .then((results) => {
        res.send(results);
        // res.sendStatus(200);
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
        return;
      });
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
  updateEmployer: async (req, res) => {
    console.log("Beginning of updateUser");
    const { id } = req.params;
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
      aboutus,
      country,
      companysize,
    } = req.body;
    await Employer.update(
      {
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
        aboutus,
        country,
        companysize,
      },
      { where: { id: req.params.id } }
    )
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
};

module.exports = controller;
