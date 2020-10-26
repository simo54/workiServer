const Sequelize = require("sequelize");
const db = require("../src/dbConfig");
const Employer = require("./Employer");

const EmployerRefToken = db.define(
  "employersessions",
  {
    tokenvalue: Sequelize.DataTypes.STRING,
    linkedjwt: Sequelize.DataTypes.STRING,
    user_id: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

// EmployerRefToken.associate = (models) => {
//     EmployerRefToken.belongsTo(Employer);
// };

module.exports = EmployerRefToken;
