const JobApplication = require("../models/JobApplication");

const controller = {
  getJobsApplications: async (req, res) => {
    const { id } = req.params;
    JobApplication.findAll({ where: { jobref: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  newJobApplication: async (req, res) => {
    const {
      firstname,
      lastname,
      middlename,
      email,
      mobile,
      city,
      zip,
      country,
      coverletter,
      resume,
      userid,
      jobref,
    } = req.body;
    console.log(
      firstname,
      lastname,
      middlename,
      email,
      mobile,
      city,
      zip,
      country,
      coverletter,
      resume,
      userid,
      jobref
    );
    // if (
    //   !firstname ||
    //   !lastname ||
    //   !email ||
    //   !mobile ||
    //   !city ||
    //   !zip ||
    //   !country ||
    //   !coverletter ||
    //   !resume
    // ) {
    //   res.sendStatus(400);
    //   console.log("something is wrong here");
    //   return;
    // }
    try {
      await JobApplication.create({
        firstname,
        lastname,
        middlename,
        email,
        mobile,
        city,
        zip,
        country,
        coverletter,
        resume,
        userid,
        jobref,
      });
      res.sendStatus(200);
      return;
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;

// const JobApplication = require("../models/JobApplication");

// const controller = {
//   getJobsApplications: async (req, res) => {
//     const { id } = req.params;
//     JobApplication.findAll({ where: { companyid: req.params.id } })
//       .then((results) => {
//         res.send(results);
//         res.sendStatus(200);
//         return;
//       })
//       .catch((err) => console.log(err));
//   },
//   newJobApplication: async (req, res) => {
//     const {
//       firstname,
//       lastname,
//       middlename,
//       email,
//       mobile,
//       city,
//       zip,
//       country,
//       coverletter,
//       resume,
//       userid,
//     } = req.body;
//     // if (
//     //   !firstname ||
//     //   !lastname ||
//     //   !email ||
//     //   !mobile ||
//     //   !city ||
//     //   !zip ||
//     //   !country ||
//     //   !coverletter ||
//     //   !resume
//     // ) {
//     //   res.sendStatus(400);
//     //   console.log("something is wrong here");
//     //   return;
//     // }
//     try {
//       await JobApplication.create({
//         firstname,
//         lastname,
//         middlename,
//         email,
//         mobile,
//         city,
//         zip,
//         country,
//         coverletter,
//         resume,
//         userid,
//       });
//       res.sendStatus(200);
//       return;
//     } catch (e) {
//       res.sendStatus(500);
//       return;
//     }
//   },
// };

// module.exports = controller;
