"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ongs",
      [
        {
          nome: "Unidos pelo Bem",
          descricao:
            "ONG dedicada a promover a solidariedade e ações humanitárias em todo o Brasil.",
          endereco_cidade: "São Paulo",
          endereco_estado: "SP",
          cnpj: "12.345.678/0001-90",
          telefone: "(11) 1234-5678",
          email: "unidosbembrazil@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/03/img-quemsomos-favela-GerandoFalcoes.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Amigos do Bem",
          descricao:
            "Organização comprometida em melhorar as condições de vida de comunidades carentes em diversas regiões do Nordeste brasileiro.",
          endereco_cidade: "Recife",
          endereco_estado: "PE",
          cnpj: "23.456.789/0001-01",
          telefone: "(81) 9876-5432",
          email: "amigosdobem@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/05/objetivos.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Semeando o Futuro",
          descricao:
            "ONG focada em fornecer educação e oportunidades para crianças carentes em áreas rurais do interior do Brasil.",
          endereco_cidade: "Brasília",
          endereco_estado: "DF",
          cnpj: "34.567.890/0001-12",
          telefone: "(61) 3333-4444",
          email: "semeandofuturo@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/11/bazar-gerando-falcoes.jpg?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Coração Solidário",
          descricao:
            "Entidade que oferece apoio emocional e assistência social para pessoas em situações de vulnerabilidade em todo o país.",
          endereco_cidade: "Rio de Janeiro",
          endereco_estado: "RJ",
          cnpj: "45.678.901/0001-23",
          telefone: "(21) 5555-6666",
          email: "coracaosolidario@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2021/07/Foto-materia-Meio-Mensagem-2.jpg?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Mãos que Ajudam",
          descricao:
            "ONG que promove ações voluntárias e projetos comunitários em várias regiões do Brasil, visando melhorar a qualidade de vida das pessoas.",
          endereco_cidade: "Belo Horizonte",
          endereco_estado: "MG",
          cnpj: "56.789.012/0001-34",
          telefone: "(31) 9876-5432",
          email: "maosqueajudam@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/04/JOVEM-FALCAO-NO-PROCESSO-DE-APRENDIZAGEM.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Abrace",
          descricao:
            "Organização dedicada a cuidar de crianças abandonadas e órfãs, oferecendo amor, apoio e oportunidades de vida digna.",
          endereco_cidade: "Salvador",
          endereco_estado: "BA",
          cnpj: "67.890.123/0001-45",
          telefone: "(71) 2222-3333",
          email: "abracesalvador@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/05/roblox-768x398.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Paz e Amor",
          descricao:
            "ONG que trabalha para promover a paz, a igualdade e a inclusão social em comunidades vulneráveis em todo o Brasil.",
          endereco_cidade: "Fortaleza",
          endereco_estado: "CE",
          cnpj: "78.901.234/0001-56",
          telefone: "(85) 7654-3210",
          email: "pazeamor@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/04/Edu0.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Vida Plena",
          descricao:
            "Entidade sem fins lucrativos que oferece suporte e cuidados para idosos em situação de abandono ou negligência.",
          endereco_cidade: "Porto Alegre",
          endereco_estado: "RS",
          cnpj: "89.012.345/0001-67",
          telefone: "(51) 9876-5432",
          email: "vidaplena@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/05/ONG-gerando-falcoes.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Esperança Renovada",
          descricao:
            "ONG comprometida em ajudar famílias carentes a superar dificuldades e construir um futuro melhor para seus filhos.",
          endereco_cidade: "Curitiba",
          endereco_estado: "PR",
          cnpj: "90.123.456/0001-16",
          telefone: "(41) 3333-2222",
          email: "esperancarenovada@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/03/IMAGEMBAZARGERANDOFALCOES.png?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Futuro Brilhante",
          descricao:
            "Organização dedicada a oferecer oportunidades de educação e desenvolvimento pessoal para jovens de comunidades desfavorecidas.",
          endereco_cidade: "Manaus",
          endereco_estado: "AM",
          cnpj: "90.123.456/0001-78",
          telefone: "(92) 9876-5432",
          email: "futurobrilhante@example.com",
          imagem:
            "https://cvee2f.p3cdn1.secureserver.net/wp-content/uploads/2022/11/iniciativa-edu-lyra-e-gerando-falcoes-falcons-university.webp?time=1709242985",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
