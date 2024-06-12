"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "permissoes_usuarios",
      [
        {
          id_usuario: 1,
          id_permissao: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_usuario: 2,
          id_permissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_usuario: 3,
          id_permissao: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_usuario: 4,
          id_permissao: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissoes_usuarios", null, {});
  },
};
