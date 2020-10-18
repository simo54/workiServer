const { Schema } = require("mongoose");
const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const User = require("./User");

const RefToken = db.define(
  "sessions",
  {
    tokenvalue: Sequelize.DataTypes.STRING,
    linkedjwt: Sequelize.DataTypes.STRING,
    user_id: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

RefToken.associate = (models) => {
  RefToken.belongsTo(User);
};

module.exports = RefToken;
