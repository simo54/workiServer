const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const RefToken = require("./RefreshToken");
const ProfileUser = require("./UserProfile");

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
    age: Sequelize.DataTypes.INTEGER,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

User.associate = (models) => {
  User.hasOne(ProfileUser);
  User.hasMany(RefToken);
};

module.exports = User;
