const { User } = require("../models");

class UserController {
  static async index(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  }

  static async showById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) throw { name: "UserNotFound" };
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
