const { Movie } = require("../models")


class Controller {
  static async readMovie(req, res, next) {
    try {
      let data = await Movie.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async readMovieById(req, res, next) {
    try {
      let data = await Movie.findByPk(req.params.id)
      if (!data) throw { name: "NotFound" }
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createMovie(req, res, next) {
    try {
      let { title, overview, rating, poster } = req.body
      let data = await Movie.create({
        title,
        overview,
        rating,
        poster
      })
      res.status(201).json({
        message: "Success create data movie",
        movie: data
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteMovieById(req, res) {
    try {
      let result = await Movie.destroy({
        where: {
          id: req.params.id
        }
      })
      if (!result) throw { name: "NotFound" }
      res.status(200).json({
        message: "Success delete movie",
      })
    } catch (error) {
      let code = 500
      let message = "Internal server error"
      if (error.name === "NotFound") {
        code = 404
        message = "Data not found"
      }
      res.status(code).json({ message })
    }
  }
}

module.exports = Controller