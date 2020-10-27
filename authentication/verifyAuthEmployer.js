const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const EmployerToken = require("../models/EmployerRefreshToken");

module.exports = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");

  try {
    const at_validity = jwt.verify(cookies.access_token, process.env.PRIV_KEY);

    if (at_validity) {
      console.log("TOKEN HAS BEEN VERIFIED");
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
    const result = await EmployerToken.findOne({
      where: {
        tokenValue: cookies.refresh_token,
      },
    });
    console.log(result);
    if (!result || !result.length) {
      res.sendStatus(401).json({ isAuthenticated: false });
      return;
    }

    const access_token = jwt.sign(
      { idUser: result.idUser },
      process.env.PRIV_KEY,
      {
        expiresIn: 60 * 0.1,
      }
    );

    const refresh_token = uuid4();

    await EmployerToken.update(
      {
        tokenValue: refresh_token,
        linkedJWT: access_token,
        idUser: result.idUser,
      },
      { where: { tokenValue: cookies.refresh_token } }
    );

    res.setHeader("Set-Cookie", [
      cookie.serialize("access_token", String(access_token), {
        httpOnly: true,
      }),
      cookie.serialize("refresh_token", String(refresh_token), {
        httpOnly: true,
      }),
    ]);
    res.json({ isAuthenticated: true });
  }
};
