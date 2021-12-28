'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
      roleName: "Basic",
      email: "test@email.com",
      password: "test",
      introvertRating: 0,
      homeCity: "Houston",
      state: "TX",
      createdAt: new Date(),
      updatedAt: new Date()
      }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
