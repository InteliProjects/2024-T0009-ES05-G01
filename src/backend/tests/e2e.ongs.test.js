const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste e2e das rotas de ONGs", () => {
  let token; // Para armazenar o token de autenticação
  let firstOngId; // Para armazenar o ID da primeira ONG

  // Realiza a autenticação antes de executar os testes
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "johndoe@ong.teste.com",
      senha: "123456",
    });
    token = response.data.token;

    // Obtem a lista de ONGs e armazena o ID da primeira para uso nos testes
    const ongsResponse = await axios.get(`${baseURL}/ongs`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    if (ongsResponse.data.ongs.length > 0) {
      firstOngId = ongsResponse.data.ongs[0].id;
    }
  });

  it("Deve retornar um array com todas as ONGs", async () => {
    const response = await axios.get(`${baseURL}/ongs`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um objeto com ongs, a qual é um array
    expect(response.data).toHaveProperty("ongs");
    expect(response.data.ongs).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.ongs.length).toBeGreaterThan(0);

    // cada item do array precisa ter um id
    response.data.ongs.forEach((ong) => {
      expect(ong).toHaveProperty("id");
    });

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar uma ONG específica", async () => {
    const response = await axios.get(`${baseURL}/ongs/${firstOngId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um objeto com ong
    expect(response.data).toHaveProperty("ong");

    // precisa ter um id
    expect(response.data.ong).toHaveProperty("id");

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao tentar obter uma ONG inexistente", async () => {
    try {
      await axios.get(`${baseURL}/ongs/0`, {
        headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
      });
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve retornar um erro ao tentar obter uma ONG sem autenticação", async () => {
    try {
      await axios.get(`${baseURL}/ongs/${firstOngId}`);
    } catch (error) {
      // status code precisa ser 401
      expect(error.response.status).toBe(401);
    }
  });

  it("Deve cadastrar uma nova ONG ou retornar erro de CNPJ já cadastrado", async () => {
    try {
      const response = await axios.post(
        `${baseURL}/ongs`,
        {
          nome: "ONG by Jest",
          descricao:
            "Esta ONG tem o propósito de servir de exemplo para testes",
          endereco_cidade: "São Paulo",
          endereco_estado: "São Paulo",
          cnpj: "12345678901234",
          telefone: "11999999999",
          email: "ongteste@ong.teste.com",
          imagem:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRaZhyOzPFieLelnDUlw1ySwza08Ptg_jdlQ&usqp=CAU",
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        }
      );

      // o status code precisa ser 201
      expect(response.status).toBe(201);

      // precisa ser um objeto com ong
      expect(response.data).toHaveProperty("ong");
    } catch (error) {
      // espera-se que o erro seja 409, devido ao conflito de cpnj
      expect(error.response.status).toBe(409);
    }
  });

  it("Deve atualizar uma ONG existente", async () => {
    const response = await axios.put(
      `${baseURL}/ongs/${firstOngId}`,
      {
        nome: "ONG by Jest - Atualizada",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // o status code precisa ser 200
    expect(response.status).toBe(200);

    // precisa ser um objeto com ong
    expect(response.data).toHaveProperty("ong");

    // precisa ter o nome atualizado
    expect(response.data.ong.nome).toBe("ONG by Jest - Atualizada");
  });

  it("Deve retornar um erro ao tentar atualizar uma ONG inexistente", async () => {
    try {
      await axios.put(
        `${baseURL}/ongs/0`,
        {
          nome: "ONG by Jest - Atualizada",
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

  it("Deve deletar uma ONG existente", async () => {

    const response = await axios.delete(`${baseURL}/ongs/10`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // status code precisa ser 204
    expect(response.status).toBe(204);

    // não deve retornar conteúdo
    expect(response.data).toBeFalsy();
  });
});
