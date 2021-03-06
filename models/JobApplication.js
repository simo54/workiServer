// Job Application model, where user submit its data that will be accessible to the employer
const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

const JobApplication = db.define(
  "jobapplications",
  {
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    middlename: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    coverletter: Sequelize.DataTypes.TEXT,
    resume: Sequelize.DataTypes.BLOB,
    userid: Sequelize.DataTypes.INTEGER,
    jobref: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = JobApplication;
