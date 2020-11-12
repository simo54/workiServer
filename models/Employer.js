// User model, the model we use when creating a new employer on frontend signup
const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const EmployerRefToken = require("./EmployerRefreshToken");
const Job = require("./Job");

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
    logo: Sequelize.DataTypes.TEXT,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    companysize: Sequelize.DataTypes.STRING,
    aboutus: Sequelize.DataTypes.TEXT,
    password: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

Employer.associate = (models) => {
  Employer.hasOne(ProfileEmployer);
  Employer.hasMany(EmployerRefToken);
  Employer.hasMany(Job);
};

module.exports = Employer;
