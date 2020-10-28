const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const Usertoken = require("../models/RefreshToken");

module.exports = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  try {
    const at_validity = jwt.verify(cookies.access_token, process.env.PRIV_KEY);
    console.log(at_validity);

    if (at_validity) {
      console.log("TOKEN HAS BEEN VERIFIED");
      res
        .status(200)
        .json({ isAuthenticated: true, user_id: at_validity.user_id });
      return;
    }
  } catch (e) {
    if (!cookies.refresh_token) {
      res.status(401).json({
        isAuthenticated: false,
      });
      return;
    }
    const result = await Usertoken.findOne({
      where: {
        tokenvalue: cookies.refresh_token,
      },
    });
    console.log(result.user_id);
    if (!result) {
      res.sendStatus(401).json({ isAuthenticated: false });
      return;
    }

    const access_token = jwt.sign(
      { user_id: result.user_id },
      process.env.PRIV_KEY,
      { expiresIn: 60 * 5 }
    );

    const refresh_token = uuid4();

    await Usertoken.update(
      {
        tokenvalue: refresh_token,
        linkedjwt: access_token,
        user_id: result.user_id,
      },
      { where: { tokenvalue: cookies.refresh_token } }
    );
    res.cookie("access_token", String(access_token), { httpOnly: true });
    res.cookie("refresh_token", String(refresh_token), { httpOnly: true });
    res.status(200).json({ isAuthenticated: true, user_id: result.user_id });
    console.log("Authentication SUCCESS in line 67 of verifyUser");
  }
};
