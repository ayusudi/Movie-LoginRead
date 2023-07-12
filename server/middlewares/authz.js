const { Movie } = require("../models")
module.exports = async (req, res, next) => {
  console.log(req.params);
  // ! Authorization
  // Admin bisa menghapus movie milik siapa saja 
  // User bisa menghapus movie milik diri sendiri
  if (req.user.role === "admin") next()
  else {
    try {
      let data = await Movie.findByPk(req.params.id)
      if (!data) throw { name: "NotFound" }
      if (data.UserId === req.user.id) next()
      else throw { name: "Forbidden" }
    } catch (error) {
      next(error)
    }
  }
};
