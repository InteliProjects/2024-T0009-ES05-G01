const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste e2e das rotas de Aulas", () => {
  let token; // Para armazenar o token de autenticação

  // Realiza a autenticação antes de executar os testes
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "marysmith@ong.teste.com",
      senha: "654321",
    });
    token = response.data.token;
  });

  it("Deve retornar um array com todas as aulas de uma turma", async () => {
    const response = await axios.get(`${baseURL}/aulas/turmas/1`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // Verifica se a resposta possui o atributo "aulas"
    expect(response.data).toHaveProperty("aulas");
    // Verifica se "aulas" é uma instância de Array
    expect(response.data.aulas).toBeInstanceOf(Array);
    // Verifica se há pelo menos uma aula retornada
    expect(response.data.aulas.length).toBeGreaterThan(0);
    // Verifica se cada aula possui um ID
    response.data.aulas.forEach((aula) => {
      expect(aula).toHaveProperty("id");
    });
    // Verifica se o status code é 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar uma aula específica", async () => {
    const response = await axios.get(`${baseURL}/aulas/1`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // Verifica se a resposta possui o atributo "aula"
    expect(response.data).toHaveProperty("aula");
    // Verifica se "aula" possui um ID
    expect(response.data.aula).toHaveProperty("id");
    // Verifica se o status code é 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao tentar obter uma aula inexistente", async () => {
    try {
      await axios.get(`${baseURL}/aulas/0`, {
        headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
      });
    } catch (error) {
      // Verifica se o status code é 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve cadastrar uma nova aula", async () => {
    try {
      const response = await axios.post(
        `${baseURL}/aulas`,
        {
          id_turma: 1,
          id_professor: 9,
          dia: "2024-03-26",
          horario: "14:00",
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        }
      );

      // Verifica se o status code é 201
      expect(response.status).toBe(201);
      // Verifica se a resposta possui o atributo "aula"
      expect(response.data).toHaveProperty("aula");
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it("Deve atualizar uma aula existente", async () => {
    try {
      const response = await axios.put(
        `${baseURL}/aulas/1`,
        {
          id_turma: 1,
          id_professor: 9,
          dia: "2024-03-27",
          horario: "15:00",
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        }
      );

      // Verifica se o status code é 200
      expect(response.status).toBe(200);
      // Verifica se a resposta possui o atributo "aula"
      expect(response.data).toHaveProperty("aula");
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it("Deve retornar um erro ao tentar atualizar uma aula inexistente", async () => {
    try {
      await axios.put(
        `${baseURL}/aulas/0`,
        {
          id_turma: 1,
          id_professor: 1,
          dia: "2024-03-27",
          horario: "15:00",
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        }
      );
    } catch (error) {
      // Verifica se o status code é 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve inserir presenças em uma aula existente", async () => {
    const response = await axios.post(
      `${baseURL}/aulas/1/presencas`,
      {
        presencas: [1, 2, 3], // IDs dos alunos presentes
      },
      {
        headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
      }
    );

    // Verifica se o status code é 200
    expect(response.status).toBe(200);
    // Verifica se a resposta possui o atributo "presencas"
    expect(response.data).toHaveProperty("presencas");
  });
});
