const bcrypt = require("bcrypt");
const UserProfile = require("../models/UserProfile");

const controller = {
  getUserProfile: async (req, res) => {
    User.findAll({
      include: db.RefToken,
    })
      .then((results) => {
        res.send(results);
        res.sendStatus(200);
        return;
      })
      .catch((err) => console.log(err));
  },
  createUser: async (req, res) => {
    const { profilepicture, aboutme, certificates, skills, resume } = req.body;
    if (!profilepicture || !aboutme || !certificates || !skills || !resume) {
      res.sendStatus(400);
      console.log("something is wrong here");
      return;
    }
    try {
      await User.create({
        profilepicture,
        aboutme,
        certificates,
        skills,
        resume,
      });
      res.sendStatus(200);
      return;
    } catch (e) {
      res.sendStatus(500);
      return;
    }
  },
};

module.exports = UserProfile;
