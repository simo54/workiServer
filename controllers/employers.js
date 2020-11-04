const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/files"),
  filename: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      console.log("PDF");
      cb(null, uuidv4() + ".pdf");
    }
    if (file.mimetype === "image/jpeg") {
      console.log("JPEG");
      cb(null, uuidv4() + ".jpeg");
    }
  },
});
const upload = multer({ storage: storage }).single("file");

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
  updateLogo: (req, res) => {
    console.log(" ==== Beginning of updateLogo");
    const { id } = req.params;
    upload(req, res, (err) => {
      if (err) {
        res.status(400).send("Something went wrong!");
      }
      Employer.update(
        {
          logo: req.file.filename,
        },
        { where: { id: req.params.id } }
      )
        .then((req) => {
          res.send(req.file);
          return;
        })
        .catch((err) => console.log(err));
      res.send(req.file);
    });
  },
  getLogo: async (req, res) => {
    const { id } = req.params;
    const result = await Employer.findOne({
      where: { id: req.params.id },
    });
    console.log("CHECKTHISHSIFEH" + result);
    res.sendFile(path.join(__dirname, `../public/files/${result.logo}`));
  },
};

module.exports = controller;
