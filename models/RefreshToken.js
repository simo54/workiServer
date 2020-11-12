// User Session model, the model we use when user login and where we pass jwt token, session token and user id inside the table
const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

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

module.exports = RefToken;
