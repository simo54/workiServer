const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_LINK, {
  host: "localhost",
  dialect: "postgres",
  subQuery: false,
  timestamps: false, //fixing the createDate && updateAt created by Sequelize as standard
});

// test db
db.authenticate()
  .then(() => console.log("Database Worki connected.."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;
