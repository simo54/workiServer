const Job = require("../models/Job");

const controller = {
  getJobs: async (req, res) => {
    console.log("beginning of getJobs");
    await Job.findAll()
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log(err));
  },
  getJobRelated: async (req, res) => {
    console.log("beginning of getJobRelated");
    const { id } = req.params;
    Job.findAll({ where: { companyid: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log("Error is: " + err));
  },
  getJobId: async (req, res) => {
    console.log("beginning of getJobId");
    const { id } = req.params;
    Job.findOne({ where: { id: req.params.id } })
      .then((results) => {
        res.send(results);
        return;
      })
      .catch((err) => console.log("Error is: " + err));
  },
  createJob: async (req, res) => {
    console.log("beginning of createJob");
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
    // if (
    //   !jobtitle ||
    //   !employmenttype ||
    //   !introduction ||
    //   !role ||
    //   !requirements ||
    //   !address ||
    //   !zip ||
    //   !city ||
    //   !country ||
    //   !contactdetails
    // ) {
    //   res.sendStatus(400);
    //   return;
    // }
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
