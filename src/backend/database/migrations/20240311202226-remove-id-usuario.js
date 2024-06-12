'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('responsaveis', 'id_usuario');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('responsaveis', 'id_usuario', {
      type: Sequelize.INTEGER,
    });
  }
};
