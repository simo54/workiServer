const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const cookie = require("cookie");

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password || !username.length || !password.length) {
    res.sendStatus(400);
    return;
  }
  try {
    const result = await User.findOne({ username });
    if (!result) {
      res.sendStatus(400);
      console.log("no user with " + result);
      return;
    }
    const passwordMatch = await bcrypt.compare(password, result.password);
    if (!passwordMatch) {
      res.sendStatus(400);
      console.log("incorrect password");
      return;
    }

    //Generate access token - JWT
    const access_token = jwt.sign({ idUser: result_id }, process.env.PRIV_KEY, {
      expiresIn: 60 * 5,
    });

    // Generate refresh token -- UUID4
    const refresh_token = uuid4();

    // Save refresh token in db with the jwt linked
    await RefreshToken.create({
      tokenValue: refresh_token,
      linkedJWT: access_token,
      idUser: result_id,
    });

    // Send back to user
    res.setHeader("Set-Cookie", [
      cookie.serialize("access-token", String(access_token), {
        httpOnly: true,
      }),
      cookie.serialize("refresh_token", String(refresh_token), {
        httpOnly: true,
      }),
    ]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
