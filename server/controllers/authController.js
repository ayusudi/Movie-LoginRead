const { User } = require("../models");
const { generateAccessToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      res.status(201).json(user);
    } catch (error) {
      next(error)
      // next({ name: "ini keyname bohongan" })
      // if (error.name == "SequelizeUniqueConstraintError") {
      //   res.status(400).json({
      //     message: "Email has ben taken",
      //   });
      // } else if (error.name == "SequelizeValidationError") {
      //   res.status(400).json({
      //     message: `You have ${error.errors.length} error(s) in your request`,
      //     errors: error.errors.map((e) => e.message),
      //   });
      // } else {
      //   res.status(500).json({ message: "Internal server error" });
      // }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "ValidationError" }; // 400 
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "FailedLogin" }; // 401 
      }
      const isVerified = user.verifyPassword(password);
      if (!isVerified) {
        throw { name: "FailedLogin" }; // 401 
      }
      // generate token
      const access_token = generateAccessToken(user);

      res.status(200).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
