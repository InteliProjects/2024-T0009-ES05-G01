const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste e2e das rotas de Turmas", () => {
  let token; // Para armazenar o token de autenticação
  let firstTurmaID; // Para armazenar o ID da primeira Turma
  let ongID; // Para armazenar o ID da ONG
  let oficinaID; // Para armazenar o ID da Oficina

  // Realiza a autenticação antes de executar os testes
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "michaeljohnson@ong.teste.com",
      senha: "987654",
    });

    token = response.data.token;

    // Obtém o ID da primeira Turma
    const turmas = await axios.get(`${baseURL}/turmas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    firstTurmaID = turmas.data.turmas[0].id;

    // busca ongs
    const ongs = await axios.get(`${baseURL}/ongs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    ongID = ongs.data.ongs[0].id;

    // busca oficinas
    const oficinas = await axios.get(`${baseURL}/oficinas/ongs/${ongID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (oficinas.data.oficinas.length !== 0) {
        oficinaID = oficinas.data.oficinas[0].id;
    }
  });

  it("Deve retornar um array com todas as Turmas", async () => {
    const response = await axios.get(`${baseURL}/turmas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // precisa ser um objeto com turmas, a qual é um array
    expect(response.data).toHaveProperty("turmas");
    expect(response.data.turmas).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.turmas.length).toBeGreaterThan(0);

    // cada item do array precisa ter um id, um nome, um id de oficina e um número de vagas
    response.data.turmas.forEach((turma) => {
      expect(turma).toHaveProperty("id");
      expect(turma).toHaveProperty("nome");
      expect(turma).toHaveProperty("id_oficina");
      expect(turma).toHaveProperty("vagas");
    });

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um array com todas as turmas de uma Oficina específica", async () => {
    if (!oficinaID) {
      return;
    }

    const response = await axios.get(
      `${baseURL}/turmas/oficinas/${oficinaID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
      
    // precisa ser um objeto com turmas, a qual é um array
    expect(response.data).toHaveProperty("turmas");
    expect(response.data.turmas).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.turmas.length).toBeGreaterThan(0);

    // cada item do array precisa ter um id, um nome, um id de oficina e um número de vagas
    response.data.turmas.forEach((turma) => {
      expect(turma).toHaveProperty("id");
      expect(turma).toHaveProperty("nome");
      expect(turma).toHaveProperty("id_oficina");
      expect(turma).toHaveProperty("vagas");
    });

    // status code precisa ser 200
    expect(response.status).toBe(200);

    // verifica se todas as turmas são da oficina correta
    response.data.turmas.forEach((turma) => {
      expect(turma.id_oficina).toBe(oficinaID);
    });
  });

  it("Deve retornar uma turma específica", async () => {
    const response = await axios.get(`${baseURL}/turmas/${firstTurmaID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // precisa ser um objeto com turma
    expect(response.data).toHaveProperty("turma");

    // precisa ter um id, um nome, um id de oficina e um número de vagas
    expect(response.data.turma).toHaveProperty("id");
    expect(response.data.turma).toHaveProperty("nome");
    expect(response.data.turma).toHaveProperty("id_oficina");
    expect(response.data.turma).toHaveProperty("vagas");

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao tentar obter uma turma inexistente", async () => {
    try {
      await axios.get(`${baseURL}/turmas/0`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve retornar um erro ao tentar obter uma turma sem autenticação", async () => {
    try {
      await axios.get(`${baseURL}/turmas/${firstTurmaID}`);
    } catch (error) {
      // status code precisa ser 401
      expect(error.response.status).toBe(401);
    }
  });

  it("Deve cadastrar uma nova turma", async () => {
    const response = await axios.post(
      `${baseURL}/turmas`,
      {
        nome: "Turma JEST 2000",
        id_oficina: 2,
        local: "Sala 2B",
        ativo: false,
        vagas: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // o status code precisa ser 201
    expect(response.status).toBe(201);

    // precisa ser um objeto com turma
    expect(response.data).toHaveProperty("turma");
  });

  it("Deve atualizar uma turma existente", async () => {
    const response = await axios.put(
      `${baseURL}/turmas/${firstTurmaID}`,
      {
        nome: "Turma by Jest - Atualizada",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // o status code precisa ser 200
    expect(response.status).toBe(200);

    // precisa ser um objeto com turma
    expect(response.data).toHaveProperty("turma");
  });

  it("Deve retornar um erro ao tentar atualizar uma turma inexistente", async () => {
    try {
      await axios.put(
        `${baseURL}/turmas/0`,
        {
          nome: "turma by Jest - Atualizada",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve deletar uma turma (caso exista)", async () => {
    try {
      const response = await axios.delete(`${baseURL}/turmas/10`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // status code precisa ser 204
      expect(response.status).toBe(204);

      // não deve retornar conteúdo
      expect(response.data).toBeFalsy();
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });
});
