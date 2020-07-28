const { Task } = require("../models");
const { verifyToken } = require("../helper/jwt");

async function author(req, res, next) {
  let { id } = req.params;
  let { access_token } = req.headers;
  try {
    const task = await Task.findByPk(id);
    if (!task) throw { status: 400, msg: "Task not found" };
    else if (task) {
      let decoded = verifyToken(access_token);
      if (decoded.id === task.user_id) next();
    } else throw { status: 403, msg: "Unauthorized" };
  } catch (err) {
    next(err);
  }
}

module.exports = author;
