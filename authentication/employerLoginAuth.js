const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const cookie = require("cookie");

const Employer = require("../models/Employer");
const EmployerRefToken = require("../models/EmployerRefreshToken");

module.exports = async (req, res, next) => {
  // We get the email and the password from the login inputs
  const { email, password } = req.body;

  // We check if email and password are correct
  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  // Check if the user exist
  try {
    const result = await Employer.findOne({
      where: { email: req.body.email },
    });

    // If user DOES NOT exist
    if (!result) {
      res.sendStatus(400);
      return;
    }

    // Account found, moving to next

    // Check if password match
    const passwordMatch = await bcrypt.compare(password, result.password);

    // If PASSWORD DOES NOT match
    if (!passwordMatch) {
      res.sendStatus(400);
      return;
    }

    // Account found and password match, next

    // Generate access token - JWT
    const access_token = jwt.sign(
      { user_id: result.id }, // Assign the userId to the row of the session
      process.env.PRIV_KEY,
      { expiresIn: 60 * 5 }
    );

    // Generate refresh token - UUID4
    const refresh_token = uuid4();

    // Save refresh token in db with the jwt linked
    await EmployerRefToken.create({
      tokenvalue: refresh_token,
      linkedjwt: access_token,
      user_id: result.id,
    });

    // Send the access token and the refresh as cookies
    res.cookie("access_token", String(access_token), { httpOnly: true });
    res.cookie("refresh_token", String(refresh_token), { httpOnly: true });
    res.sendStatus(200);
    return;
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
};
