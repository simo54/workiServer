const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "postgres://wkjhuhwf:sAGJOdHqG9zIvhgFiwV8NfRSpecMdcw4@rogue.db.elephantsql.com:5432/wkjhuhwf",
  {
    host: "localhost",
    dialect: "postgres",
    subQuery: false,
    timestamps: false, //fixing the createdat updateat useless columns
  }
); // Example for postgres

// test db
db.authenticate()
  .then(() => console.log("Database Worki connected.."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;
