const Job = require("../models/Job");

const controller = {
  getJobs: async (req, res) => {
    await Job.findAll()
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  getJobRelated: async (req, res) => {
    const { id } = req.params;
    Job.findAll({ where: { companyid: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log("Error is: " + err));
  },
  getJobId: async (req, res) => {
    const { id } = req.params;
    Job.findOne({ where: { id: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log("Error is: " + err));
  },
  createJob: async (req, res) => {
    const {
      jobtitle,
      employmenttype,
      role,
      requirements,
      zip,
      city,
      country,
      contactdetails,
      introduction,
      companyid,
      jobref,
    } = req.body;
    try {
      await Job.create({
        jobtitle,
        employmenttype,
        role,
        requirements,
        zip,
        city,
        country,
        contactdetails,
        introduction,
        companyid,
        jobref,
      });
      res.sendStatus(200);
      return;
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;
