const route = require("express").Router();
const CommandCenter = require("../controller");

route.get("/:id", CommandCenter.getCategories);
route.post("/:org_id", CommandCenter.addCategory);
route.put("/:name", CommandCenter.editCategory);
route.delete("/:name/:org_id", CommandCenter.deleteCategory);

module.exports = route;
