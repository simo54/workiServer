const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

const Employer = db.define(
  "employers",
  {
    companyname: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    middlename: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    zip: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    companysize: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Employer;
