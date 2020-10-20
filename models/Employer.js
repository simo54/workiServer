const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const EmployerRefToken = require("./EmployerRefreshToken");
const Job = require("../models/Job")

const Employer = db.define(
  "employers",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    companyname: Sequelize.DataTypes.STRING,
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    middlename: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    companysize: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

Employer.associate = (models) => {
  Employer.hasMany(EmployerRefToken);
  Employer.hasMany(Job)
};

module.exports = Employer;
