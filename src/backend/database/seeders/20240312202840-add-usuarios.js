'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'John Doe',
        email: "johndoe@ong.teste.com",
        senha: "123456",
        rg: "111282825",
        telefone: "11999999999",
        cpf: "11122233344",
        data_nasc: "1990-01-01",
        profissao: "Programador",
        nacionalidade: "Brasileiro",
        escolaridade: "Superior",
        identidade: "Cis",
        genero: "Masculino",
        naturalidade: "São Paulo",
        etnia: "Branco",
        estado_civil: "Solteiro",
        data_inicio: "2022-01-01",
        voluntariado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Jane Doe',
        email: "janedoe@ong.teste.com",
        senha: "123456",
        rg: "111282826",
        data_nasc: "1990-01-01",
        profissao: "Programador",
        nacionalidade: "Brasileiro",
        escolaridade: "Superior",
        identidade: "Cis",
        genero: "Feminino",
        naturalidade: "São Paulo",
        etnia: "Branco",
        estado_civil: "Solteiro",
        data_inicio: "2022-01-01",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Mary Smith',
        email: "marysmith@ong.teste.com",
        senha: "654321",
        rg: "222333444",
        telefone: "11888888888",
        cpf: "55566677788",
        data_nasc: "2000-05-10",
        profissao: "Informal",
        nacionalidade: "Brasileira",
        escolaridade: "Superior",
        identidade: "Cis",
        genero: "Feminino",
        naturalidade: "Rio de Janeiro",
        etnia: "Branco",
        estado_civil: "Solteira",
        data_inicio: "2022-01-01",
        renda: 1000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Michael Johnson',
        email: "michaeljohnson@ong.teste.com",
        senha: "987654",
        rg: "333444555",
        telefone: "11777777777",
        cpf: "99988877766",
        data_nasc: "1985-08-20",
        profissao: "Engenheiro",
        nacionalidade: "Brasileiro",
        escolaridade: "Superior",
        identidade: "Cis",
        genero: "Masculino",
        naturalidade: "São Paulo",
        etnia: "Branco",
        estado_civil: "Casado",
        data_inicio: "2022-01-01",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
