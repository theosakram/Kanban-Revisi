const route = require("express").Router();
const CommandCenter = require("../controller");

route.post("/user/:user_id", CommandCenter.addOrg);
route.get("/all/:id", CommandCenter.getOrg);
route.post("/enter/:id/:name", CommandCenter.enterOrg);
route.delete("/kick/:id/:name", CommandCenter.kickMember);
route.get("/:name", CommandCenter.seeMember);
route.put("/:name", CommandCenter.editOrg);
route.delete("/:name", CommandCenter.deleteOrg);

module.exports = route;
