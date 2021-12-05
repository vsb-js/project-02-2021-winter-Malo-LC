'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'PNL',
        followers: '3646784',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'La Fève',
        followers: '5694',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Daft Punk',
        followers: '4129387',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Artists', null, {});

  }
};
