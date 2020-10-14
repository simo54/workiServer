const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  tokenValue: String,
  linkedJWT: String,
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
