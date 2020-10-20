const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const Employer = require("../models/Employer")

const Job = db.define(
  "jobs",
  {
    jobtitle: Sequelize.DataTypes.STRING,
    employmenttype: Sequelize.DataTypes.STRING,
    introduction: Sequelize.DataTypes.TEXT,
    role: Sequelize.DataTypes.TEXT,
    requirements: Sequelize.DataTypes.TEXT,
    address: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    contactdetails: Sequelize.DataTypes.STRING,
    datejobpost: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false,
  }
);

Job.associate = (models) => {
  Job.belongsTo(Employer);
};

module.exports = Job;
