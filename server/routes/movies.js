const Controller = require("../controllers/controller");
const authz = require("../middlewares/authz")
const router = require("express").Router();


router.get("/", Controller.readMovie)
router.get("/:id", Controller.readMovieById)
router.post("/", Controller.createMovie)
router.delete("/:id", authz, Controller.deleteMovieById)

module.exports = router