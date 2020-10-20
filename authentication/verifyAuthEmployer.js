const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const EmployerToken = require("../models/EmployerRefreshToken");

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
  const result = await EmployerToken.findOne({
    tokenValue: cookies.refresh_token,
  });
  if (!result) {
    res.sendStatus(401);
    return;
  }

  // Generate access token - JWT
  const access_token = jwt.sign(
    { idUser: result.idUser },
    process.env.PRIV_KEY,
    {
      expiresIn: 60 * 5,
    }
  );
  // Generate refresh token - UUID4
  const refresh_token = uuid4();
  // Save refresh token in db with the jwt linked
  await EmployerToken.findOneAndUpdate(
    { tokenValue: cookies.refresh_token },
    {
      tokenValue: refresh_token,
      linkedJWT: access_token,
      idUser: result.idUser,
    }
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
};
