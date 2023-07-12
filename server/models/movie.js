'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Title has been register"
      },
      validate: {
        notNull: {
          msg: "Title is require (Not Null)"
        },
        notEmpty: {
          msg: "Title is require (Not Empty)"
        }
      }
    },
    overview: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    poster: DataTypes.STRING,
    UserId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};