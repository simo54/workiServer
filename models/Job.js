const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

const Job = db.define(
  "jobs",
  {
    jobtitle: Sequelize.DataTypes.STRING,
    employmenttype: Sequelize.DataTypes.STRING,
    introduction: Sequelize.DataTypes.TEXT,
    role: Sequelize.DataTypes.STRING,
    requirements: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    contactdetails: Sequelize.DataTypes.STRING
  },
  {
    timestamps: false,
  }
);

module.exports = Job;
