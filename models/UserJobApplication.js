const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const Job = require("./Job");

const JobApplication = db.define(
  "jobapplications",
  {
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    middlename: Sequelize.DataTypes.STRING,
    dateofbirth: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    coverletter: Sequelize.DataTypes.TEXT,
    resume: Sequelize.DataTypes.BLOB,
  },
  {
    timestamps: false,
  }
);

JobApplication.associate = (models) => {
  JobApplication.belongsTo(Job);
};

module.exports = JobApplication;
