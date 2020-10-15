const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const cookie = require("cookie");

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.sendStatus(400);
    return;
  }
  try {
    //Check if user exist
    const result = await User.findOne({
      where: { email: req.body.email },
    });

    // ========== IF USET DOES NOT EXIST ==========
    if (!result) {
      res.sendStatus(400);
      res.send("Wrong user");
      return;
    }
    // ========== IF USET DOES NOT EXIST ==========

    //Check is password match
    const passwordMatch = await bcrypt.compare(password, result.password);

    // ========== IF PASSWORD DOES NOT MATCH ==========
    if (!password) {
      res.sendStatus(400);
      return;
    }
    // ========== IF PASSWORD DOES NOT MATCH ==========

    // Generate access token - JWT
    const access_token = jwt.sign(
      { idUser: result._id },
      process.env.PRIV_KEY,
      { expiresIn: 60 * 5 }
    );

    // Generate refresh token - UUID4
    const refresh_token = uuid4();

    // Save refresh token in db with the jwt linked
    await RefreshToken.create({
      tokenvalue: refresh_token,
      linkedjwt: access_token,
      user_id: result._id,
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
