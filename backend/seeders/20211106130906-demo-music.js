'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Music', [
      {
        name: 'One More Time',
        album: 'Discovery',
        runTime:'320',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aerodynamic',
        album: 'Discovery',
        runTime:'212',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Digital Love',
        album: 'Discovery',
        runTime:'301',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Harder Better Faster Stronger',
        album: 'Discovery',
        runTime:'224',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crescendolls',
        album: 'Discovery',
        runTime:'211',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nightvision',
        album: 'Discovery',
        runTime:'104',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Superheroes',
        album: 'Discovery',
        runTime:'237',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DA',
        album: 'Dans la légende',
        runTime:'320',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Naha',
        album: 'Dans la légende',
        runTime:'285',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dans la légende',
        album: 'Dans la légende',
        runTime:'236',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mira',
        album: 'Dans la légende',
        runTime:'215',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "J'suis QLF",
        album: 'Dans la légende',
        runTime:'268',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'La vie est belle',
        album: 'Dans la légende',
        runTime:'233',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DIEZ',
        album: 'KOLAF',
        runTime:'151',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SNITCH',
        album: 'KOLAF',
        runTime:'136',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'DSMJ',
        album: 'KOLAF',
        runTime:'147',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BELLE SOMME',
        album: 'KOLAF',
        runTime:'178',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'JEUNE INTERLUDE',
        album: 'KOLAF',
        runTime:'106',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ALCHIMIE',
        album: 'KOLAF',
        runTime:'118',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VILAIN',
        album: 'KOLAF',
        runTime:'181',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Music', null, {});

  }
};
