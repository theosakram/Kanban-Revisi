const route = require("express").Router();
const CommandCenter = require("../controller");
const author = require("../middleware/authorization");

route.get("/:id", CommandCenter.getTask);
route.post("/", CommandCenter.addTask);
route.put("/:id", author, CommandCenter.editTask);
route.put("/next/:id", author, CommandCenter.taskNext);
route.put("/back/:id", author, CommandCenter.taskBack);
route.delete("/:id", author, CommandCenter.deleteTask);

module.exports = route;
