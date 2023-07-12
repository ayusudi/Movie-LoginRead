const UserController = require("../controllers/userController");
const router = require("express").Router();

//
router.get("/", UserController.index);
router.get("/:id", UserController.showById);

module.exports = router;