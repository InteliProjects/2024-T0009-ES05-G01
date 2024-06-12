'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
      },
      cpf: {
        type: Sequelize.STRING,
      },
      data_nasc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      profissao: {
        type: Sequelize.STRING,
      },
      nacionalidade: {
        type: Sequelize.STRING,
      },
      escolaridade: {
        type: Sequelize.STRING,
      },
      identidade: {
        type: Sequelize.STRING,
      },
      naturalidade: {
        type: Sequelize.STRING,
      },
      etnia: {
        type: Sequelize.STRING,
      },
      estado_civil: {
        type: Sequelize.STRING,
      },
      data_inicio: {
        type: Sequelize.DATE,
      },
      area_atuacao: {
        type: Sequelize.STRING,
      },
      renda: {
        type: Sequelize.DECIMAL(10, 2),
      },
      situacao: {
        type: Sequelize.STRING,
      },
      qualificacoes: {
        type: Sequelize.TEXT,
      },
      turno_inicio: {
        type: Sequelize.STRING,
      },
      turno_fim: {
        type: Sequelize.STRING,
      },
      especialidade: {
        type: Sequelize.STRING,
      },
      cargo: {
        type: Sequelize.STRING,
      },
      voluntariado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};