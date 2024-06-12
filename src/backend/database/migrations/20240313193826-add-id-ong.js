'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // adicionja id_ong à tabela de usuarios, que referencia ongs id
    await queryInterface.addColumn('usuarios', 'id_ong', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ongs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'id_ong');
  }
};
