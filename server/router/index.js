const route = require("express").Router();
const task = require("./task");
const category = require("../router/category");
const org = require("../router/org");
const CommandCenter = require("../controller");
const authentic = require("../middleware/authentication");

route.post("/login", CommandCenter.login);
route.post("/googlelogin", CommandCenter.googleLogin);
route.post("/register", CommandCenter.register);

route.use(authentic);
route.use("/task", task);
route.use("/category", category);
route.use("/org", org);

module.exports = route;
