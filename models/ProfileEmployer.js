const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

// Most of the data will be taken from the employer db as there is not point on creating new Datatypes
const ProfileEmployer = db.define(
  "employerprofiles",
  {
    // firstname: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // lastname: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // middlename: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // email: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // mobile: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // address: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // city: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // zip: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    // country: Sequelize.DataTypes.STRING, || To be taken from Employer Db
    companylogo: Sequelize.DataTypes.BLOB,
    aboutus: Sequelize.DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
);

module.exports = ProfileEmployer;
