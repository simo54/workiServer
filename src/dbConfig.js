// Configuration of the database connection to elephantsql
const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
  subQuery: false,
  timestamps: false, //fixing the createDate && updateAt created by Sequelize as standard
});

db.authenticate()
  .then(() => console.log("Database Worki connected.."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;
