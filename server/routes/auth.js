const AuthController = require("../controllers/authController");
const router = require("express").Router();

router.get("/", (req, res) => res.status(200).json("HELLO WORLD"))
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
