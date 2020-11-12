// Job application controller, where user can create an application, and where employer can retrieve applications and user's pdf
const path = require("path");
const JobApplication = require("../models/JobApplication");

const controller = {
  getJobsApplications: (req, res) => {
    const { id } = req.params;
    JobApplication.findAll({ where: { jobref: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  getResumeFromApplication: async (req, res) => {
    const { id, jobref } = req.params;
    const result = await JobApplication.findOne({
      where: { userid: req.params.id, jobref: req.params.jobref },
    });
    res.sendFile(path.join(__dirname, `../public/files/${result.resume}`));
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
