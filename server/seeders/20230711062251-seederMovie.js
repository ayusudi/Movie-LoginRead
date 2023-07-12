'use strict';
const data = require("../data.json")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    data.forEach(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.UserId = 1
    })
    await queryInterface.bulkInsert("Movies", data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {})
  }
};
