const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const Usertoken = require("../models/RefreshToken");

module.exports = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  try {
    const at_validity = jwt.verify(cookies.access_token, process.env.PRIV_KEY);
    if (at_validity) {
      res.json({ isAuthenticated: true });
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
    if (!result) {
      res.sendStatus(401).json({ isAuthenticated: false });
      return;
    }

    const access_token = jwt.sign(
      { idUser: result.idUser },
      process.env.PRIV_KEY,
      { expiresIn: 60 * 5 }
    );

    const refresh_token = uuid4();

    await Usertoken.update(
      {
        tokenValue: refresh_token,
        linkedJWT: access_token,
        idUser: result.idUser,
      },
      { where: { tokenValue: cookies.refresh_token } }
    );
    res.cookie("access_token", String(access_token), { httpOnly: true });
    res.cookie("refresh_token", String(refresh_token), { httpOnly: true });
    res.json({ isAuthenticated: true });
    console.log("Authentication SUCCESS in line 67 of verifyUser");
  }
};
