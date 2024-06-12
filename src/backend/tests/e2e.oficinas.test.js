const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste das rotas de Oficinas", () => {
  let token; // Para armazenar o token de autenticação
  let firstOficinaId; // Para armazenar o ID da primeira oficina

  // Realiza a autenticação antes de executar os testes
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "michaeljohnson@ong.teste.com",
      senha: "987654",
    });
    token = response.data.token; // Ajuste isso conforme o caminho do token na resposta

    // Obtem a lista de oficinas e armazena o ID da primeira para uso nos testes
    const oficinasResponse = await axios.get(`${baseURL}/oficinas/ongs/12`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    if (oficinasResponse.data.oficinas.length > 0) {
      firstOficinaId = oficinasResponse.data.oficinas[0].id;
    }
  });

  it("Deve retornar um array com todas as oficinas", async () => {
    const response = await axios.get(`${baseURL}/oficinas/ongs/12`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um objeto com oficinas, a qual é um array
    expect(response.data).toHaveProperty("oficinas");
    expect(response.data.oficinas).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.oficinas.length).toBeGreaterThan(0);

    // cada item do array precisa ter um id, uma descrição, um tema, uma data de início, uma data de fim e um id de ONG
    response.data.oficinas.forEach((oficina) => {
      expect(oficina).toHaveProperty("id");
      expect(oficina).toHaveProperty("descricao");
      expect(oficina).toHaveProperty("tema");
      expect(oficina).toHaveProperty("data_inicio");
      expect(oficina).toHaveProperty("data_fim");
      expect(oficina).toHaveProperty("id_ong");
    });

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar todas as oficinas de uma ong específica", async () => {
    const response = await axios.get(`${baseURL}/oficinas/ongs/12`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um objeto com oficinas, a qual é um array
    expect(response.data).toHaveProperty("oficinas");
    expect(response.data.oficinas).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.oficinas.length).toBeGreaterThan(0);

    response.data.oficinas.forEach((oficina) => {
      expect(oficina).toHaveProperty("id");
      expect(oficina).toHaveProperty("descricao");
      expect(oficina).toHaveProperty("tema");
      expect(oficina).toHaveProperty("data_inicio");
      expect(oficina).toHaveProperty("data_fim");
      expect(oficina).toHaveProperty("id_ong");
    });

    // status code precisa ser 200
    expect(response.status).toBe(200);

    // verifica se todas as oficinas são da ong correta
    response.data.oficinas.forEach((oficina) => {
      expect(oficina.id_ong).toBe(12);
    });
  });

  it("Deve retornar um erro ao tentar obter uma oficina inexistente", async () => {
    try {
      await axios.get(`${baseURL}/oficinas/0`, {
        headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
      });
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
      // mostra o status e a mensagem de erro
      console.log(error.response.status, error.response.data);
    }
  });

  it("Deve retornar um erro ao tentar obter uma oficina sem autenticação", async () => {
    try {
      await axios.get(`${baseURL}/oficinas/${firstOficinaId}`);
    } catch (error) {
      // status code precisa ser 401
      expect(error.response.status).toBe(401);
      // mostra o status e a mensagem de erro
      console.log(error.response.status, error.response.data);
    }
  });

  it("Deve cadastrar uma nova oficina, se não retorna erro", async () => {
    try {
      const response = await axios.post(
        `${baseURL}/oficinas/`,
        {
          nome: "oficina by Jest",
          descricao:
            "Esta oficina tem o propósito de servir de exemplo para testes",
          tema: "Tema de teste",
          data_inicio: "2024-01-02 00:00:00 +0000",
          data_fim: "2024-12-02 00:00:00 +0000",
          id_ong: "12",
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        }
      );

      // o status code precisa ser 201
      expect(response.status).toBe(201);

      // precisa ser um objeto com oficina
      expect(response.data).toHaveProperty("oficina");
    } catch (error) {
      // mostra o status e a mensagem de erro
      console.log(error.response.status, error.response.data);
    }
  });

  it("Deve atualizar uma oficina existente", async () => {
    const response = await axios.put(
      `${baseURL}/oficinas/${firstOficinaId}`,
      {
        nome: "Oficina by Jest - Atualizada",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // o status code precisa ser 200
    expect(response.status).toBe(200);

    // precisa ser um objeto com oficina
    expect(response.data).toHaveProperty("oficina");
  });

  it("Deve retornar um erro ao tentar atualizar uma oficina inexistente", async () => {
    try {
      await axios.put(
        `${baseURL}/oficinas/0`,
        {
          nome: "Oficina by Jest - Atualizada",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
      // mostra o status e a mensagem de erro
      console.log(error.response.status, error.response.data);
    }
  });

  it("Deve deletar uma oficina existente", async () => {
    try {
      const response = await axios.delete(`${baseURL}/oficinas/4`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // o status code precisa ser 200
      expect(response.status).toBe(204);
    } catch (error) {
      // mostra o status e a mensagem de erro
      expect(error.response.status).toBe(404);
    }
  });

});

