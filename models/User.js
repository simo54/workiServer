// User model, the model we use when creating a new user on frontend signup
const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const JobApplication = require("./JobApplication");

const User = db.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    middlename: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    profilepicture: Sequelize.DataTypes.TEXT,
    skills: Sequelize.DataTypes.TEXT,
    resume: Sequelize.DataTypes.TEXT,
    password: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

User.associate = (models) => {
  User.hasOne(ProfileUser);
  User.hasMany(JobApplication);
};

module.exports = User;
