const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/files"),
  filename: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, uuidv4() + ".pdf");
    }
    if (file.mimetype === "image/jpeg") {
      cb(null, uuidv4() + ".jpeg");
    }
  },
});
const upload = multer({ storage: storage }).single("file");

const User = require("../models/User");

const controller = {
  getUserById: async (req, res) => {
    const { id } = req.params;
    await User.findOne({
      where: { id: req.params.id },
    })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  getUsers: async (req, res) => {
    await User.findAll({})
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  createUser: async (req, res) => {
    const {
      firstname,
      lastname,
      middlename,
      age,
      email,
      mobile,
      address,
      city,
      zip,
      country,
      password,
    } = req.body;
    if (!firstname || !lastname || !email || !zip || !country || !password) {
      res.sendStatus(400);
      return;
    }
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        await User.create({
          firstname,
          lastname,
          middlename,
          age,
          email,
          mobile,
          address,
          city,
          zip,
          country,
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
  updateUser: async (req, res) => {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      middlename,
      email,
      mobile,
      address,
      city,
      zip,
      country,
    } = req.body;
    await User.update(
      {
        firstname,
        lastname,
        middlename,
        email,
        mobile,
        address,
        city,
        zip,
        country,
      },
      { where: { id: req.params.id } }
    )
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  },
  updateUserResume: (req, res) => {
    const { id } = req.params;
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
      }
      User.update(
        {
          resume: req.file.filename,
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
  updateProfilePicture: (req, res) => {
    const { id } = req.params;
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
      }
      User.update(
        {
          profilepicture: req.file.filename,
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
  getProfilePicture: async (req, res) => {
    const { id } = req.params;
    const result = await User.findOne({
      where: { id: req.params.id },
    });
    res.sendFile(
      path.join(__dirname, `../public/files/${result.profilepicture}`)
    );
  },
  getResume: async (req, res) => {
    const { id } = req.params;
    const result = await User.findOne({
      where: { id: req.params.id },
    });
    res.sendFile(path.join(__dirname, `../public/files/${result.resume}`));
  },
};

module.exports = controller;
