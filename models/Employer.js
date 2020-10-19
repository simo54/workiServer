const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const EmployerRefToken = require("./EmployerRefreshToken");

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

    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.INTEGER,
    // },
    // companyname: {
    //   type: Sequelize.STRING,
    // },
    // firstname: {
    //   type: Sequelize.STRING,
    // },
    // lastname: {
    //   type: Sequelize.STRING,
    // },
    // middlename: {
    //   type: Sequelize.STRING,
    // },
    // email: {
    //   type: Sequelize.STRING,
    // },
    // mobile: {
    //   type: Sequelize.STRING,
    // },
    // address: {
    //   type: Sequelize.STRING,
    // },
    // city: {
    //   type: Sequelize.STRING,
    // },
    // zip: {
    //   type: Sequelize.STRING,
    // },
    // country: {
    //   type: Sequelize.STRING,
    // },
    // companysize: {
    //   type: Sequelize.STRING,
    // },
    // password: {
    //   type: Sequelize.STRING,
    // },
  },
  {
    timestamps: false,
  }
);

Employer.associate = (models) => {
  Employer.hasMany(EmployerRefToken);
};

module.exports = Employer;
