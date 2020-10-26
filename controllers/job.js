const Job = require("../models/Job");

const controller = {
  getJobs: async (req, res) => {
    console.log("beginning of getJobs");
    Job.findAll()
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  getJobId: async (req, res) => {
    console.log("beginning of getJobId");
    const { id } = req.params;
    console.log(id);
    Job.findOne({ where: { id: req.params.id } })
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  createJob: async (req, res) => {
    console.log("beginning of createJob");
    const {
      jobtitle,
      employmenttype,
      role,
      requirements,
      address,
      zip,
      city,
      country,
      contactdetails,
      introduction,
    } = req.body;
    if (
      !jobtitle ||
      !employmenttype ||
      !introduction ||
      !role ||
      !requirements ||
      !address ||
      !zip ||
      !city ||
      !country ||
      !contactdetails
    ) {
      res.sendStatus(400);
      console.log("problem is on creating the jobs");
      return;
    }
    try {
      console.log("everything fine until here");
      await Job.create({
        jobtitle,
        employmenttype,
        role,
        requirements,
        address,
        zip,
        city,
        country,
        contactdetails,
        introduction,
      });

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = controller;
