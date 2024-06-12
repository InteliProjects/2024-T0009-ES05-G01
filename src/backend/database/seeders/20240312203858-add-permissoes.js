'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes', [
      {
        perfil: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perfil: 'BENEFICIADO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perfil: 'PROF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perfil: 'LIDER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissoes', null, {});
  }
};
