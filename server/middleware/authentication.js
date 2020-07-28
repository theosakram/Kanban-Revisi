const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

async function authentication(req, res, next) {
  let { access_token } = req.headers;
  try {
    let decoded = verifyToken(access_token);
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!user) throw { status: 400, msg: "User not found" };
    else {
      req.data = decoded;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
