const bcrypt = require("bcrypt");
const User = require("../models/User");
// const db = require("../src/dbConfig");

const controller = {
  getUsers: async (req, res) => {
    User.findAll({
      include: db.RefToken,
    })
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
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
      console.log("something is wrong here");
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
      });
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;
