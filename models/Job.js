const Sequelize = require("sequelize");
const db = require("../src/dbConfig");

const Job = db.define(
  "jobs",
  {
    jobtitle: Sequelize.DataTypes.STRING,
    employmenttype: Sequelize.DataTypes.STRING,
    role: Sequelize.DataTypes.TEXT,
    requirements: Sequelize.DataTypes.TEXT,
    zip: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    contactdetails: Sequelize.DataTypes.STRING,
    introduction: Sequelize.DataTypes.TEXT,
    companyid: Sequelize.DataTypes.INTEGER,
    datejobpost: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    jobref: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

const JobApplication = db.define(
  "applications",
  {
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    middlename: Sequelize.DataTypes.STRING,
    dateofbirth: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING,
    zip: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    coverletter: Sequelize.DataTypes.TEXT,
    resume: Sequelize.DataTypes.BLOB,
  },
  {
    timestamps: false,
  }
);

const JobsApplications = db.define(
  "jobsapplications",
  {
    JobId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: Job, // 'Movies' would also work
        key: "id",
      },
    },
    JobApplicationId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: JobApplication, // 'Movies' would also work
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Job.belongsToMany(JobApplication, { through: JobsApplications });
JobApplication.belongsToMany(Job, { through: JobsApplications });

module.exports = Job;

// const Sequelize = require("sequelize");
// const db = require("../src/dbConfig");
// const Employer = require("../models/Employer");
// const JobApplication = require("./UserJobApplication");

// const Job = db.define(
//   "jobs",
//   {
//     jobtitle: Sequelize.DataTypes.STRING,
//     employmenttype: Sequelize.DataTypes.STRING,
//     introduction: Sequelize.DataTypes.TEXT,
//     role: Sequelize.DataTypes.TEXT,
//     requirements: Sequelize.DataTypes.TEXT,
//     zip: Sequelize.DataTypes.STRING,
//     city: Sequelize.DataTypes.STRING,
//     country: Sequelize.DataTypes.STRING,
//     contactdetails: Sequelize.DataTypes.STRING,
//     datejobpost: {
//       type: Sequelize.DATEONLY,
//       allowNull: false,
//       defaultValue: Sequelize.NOW,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// Job.associate = (models) => {
//   Job.belongsTo(Employer);
// };

// Job.associate = (models) => {
//   Job.hasMany(JobApplication);
// };

// module.exports = Job;
