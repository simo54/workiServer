const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const Usertoken = require("../models/RefreshToken");

module.exports = async (req, res, next) => {
  // get cookies from the request
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies);

  // verify the validity of the access token
  const at_validity = jwt.verify(cookies.access_token, process.env.PRIV_KEY);
  // valid: next
  if (at_validity) {
    next();
    return;
  }
  // notValid: use refresh token create a new access token
  //        verify refresh is valid, create new jwt, create new refresh token, update in the database
  const result = await Usertoken.findOne({
    tokenValue: cookies.refresh_token,
  });
  if (!result) {
    res.sendStatus(401);
    next();
  }

  // Generate access token - JWT
  const access_token = jwt.sign(
    { idUser: result.idUser },
    process.env.PRIV_KEY,
    {
      expiresIn: 60 * 1,
    }
  );
  // Generate refresh token - UUID4
  const refresh_token = uuid4();
  // Save refresh token in db with the jwt linked

  await Usertoken.update(
    {
      tokenValue: refresh_token,
      linkedJWT: access_token,
      idUser: result.idUser,
    },
    { where: { tokenValue: cookies.refresh_token } }
  );
  // Send back both to the client
  res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", String(access_token), {
      httpOnly: true,
    }),
    cookie.serialize("refresh_token", String(refresh_token), {
      httpOnly: true,
    }),
  ]);
  // send back the new values
};
