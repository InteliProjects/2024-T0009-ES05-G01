const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste e2e das rotas de Usuários", () => {
  let token; // Para armazenar o token de autenticação
  let firstUserId; // Para armazenar o ID do primeiro usuário

  // Realiza a autenticação antes de executar os testes
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "johndoe@ong.teste.com",
      senha: "123456",
    });
    token = response.data.token; // Ajuste isso conforme o caminho do token na resposta

    const userResponse = await axios.get(`${baseURL}/usuarios?perfil=Lider`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação]
    });

    // Obtem a lista de usuários com o perfil líder e armazena o ID do primeiro para uso nos testes
    if (userResponse.data.usuarios.length > 0) {
      firstUserId = userResponse.data.usuarios[0].id;
    }
  });

  it("Deve retornar um array com todos os usuários filtrados por perfil igual Beneficiado", async () => {
    const response = await axios.get(`${baseURL}/usuarios?perfil=Beneficiado`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });
    // precisa ser um objeto com usuarios, a qual é um array
    expect(response.data).toHaveProperty("usuarios");
    expect(response.data.usuarios).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.usuarios.length).toBeGreaterThan(0);

    // cada item do array precisa ser um beneficiado
    response.data.usuarios.forEach((usuario) => {
      expect(usuario.permissoes[0].perfil).toBe("BENEFICIADO");
    });
    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um array com todos os usuários filtrados por perfil igual Lider", async () => {
    const response = await axios.get(`${baseURL}/usuarios?perfil=Lider`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });
    // precisa ser um objeto com usuarios, a qual é um array
    expect(response.data).toHaveProperty("usuarios");
    expect(response.data.usuarios).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.usuarios.length).toBeGreaterThan(0);

    // cada item do array precisa ser um líder
    response.data.usuarios.forEach((usuario) => {
      expect(usuario.permissoes[0].perfil).toBe("LIDER");
    });
    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um array com todos os usuários filtrados por perfil igual Professor", async () => {
    const response = await axios.get(`${baseURL}/usuarios?perfil=Prof`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });
    // precisa ser um objeto com usuarios, a qual é um array
    expect(response.data).toHaveProperty("usuarios");
    expect(response.data.usuarios).toBeInstanceOf(Array);

    // array precisa ter pelo menos um item
    expect(response.data.usuarios.length).toBeGreaterThan(0);

    // cada item do array precisa ser um professor
    response.data.usuarios.forEach((usuario) => {
      expect(usuario.permissoes[0].perfil).toBe("PROF");
    });
    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um usuário específico", async () => {
    const response = await axios.get(`${baseURL}/usuarios/${firstUserId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um objeto com usuario
    expect(response.data).toHaveProperty("usuario");

    // precisa ter um id
    expect(response.data.usuario).toHaveProperty("id");

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao tentar obter um usuário inexistente", async () => {
    try {
      await axios.get(`${baseURL}/usuarios/0`, {
        headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
      });
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve retornar um erro ao tentar obter um usuário sem autenticação", async () => {
    try {
      await axios.get(`${baseURL}/usuarios/${firstUserId}`);
    }
    catch (error) {
      // status code precisa ser 401
      expect(error.response.status).toBe(401);
    }
  });

  it("Deve cadastrar um novo usuário", async () => {
    try {
      const response = await axios.post(`${baseURL}/usuarios`,
        {
          nome: "Novo Usuário Líder",
          email: "lider2.0@teste.com",
          genero: "Masculino",
          senha: "senha123",
          rg: "1234567",
          telefone: "11987654321",
          cpf: "98765432109",
          data_nasc: "1990-01-01",
          profissao: "Líder Profissional",
          nacionalidade: "Brasileiro",
          escolaridade: "Ensino Superior",
          identidade: "78901234",
          naturalidade: "São Paulo",
          etnia: "Branco",
          estado_civil: "Solteiro",
          id_ong: 13,
          especialidade: "Liderança de Equipes",
          perfil: "LIDER",
          voluntariado: true
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
        });

      // precisa ser um objeto com usuario
      expect(response.data).toHaveProperty("usuario");

      // o status code precisa ser 201
      expect(response.status).toBe(201);
    } catch (error) {
      // espera erro 400
      expect(error.response.status).toBe(400);
    }
  });

  it("Deve atualizar um usuário existente", async () => {
    const response = await axios.put(`${baseURL}/usuarios/${firstUserId}`,
      {
        nome: "Usuário Líder Atualizado",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // o status code precisa ser 200
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao tentar atualizar um usuário inexistente", async () => {
    try {
      await axios.put(`${baseURL}/usuarios/0`,
        {
          nome: "Usuário Atualizado",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
      // status code precisa ser 404
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve deletar um usuário existente", async () => {
    try {
      const response = await axios.delete(`${baseURL}/usuarios/40`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Verifica se a deleção foi bem-sucedida (status 204) ou se o usuário já foi deletado (status 404)
      expect(response.status).toBe(204);

      // Não deve retornar conteúdo quando a deleção é bem-sucedida
      expect(response.data).toBeFalsy();
    } catch (error) {
      // Verifica se o erro foi devido ao usuário não existir mais (status 404)
      expect(error.response.status).toBe(404);
    }
  });

  it("Deve retornar as oficinas de um benefiado logado", async () => {
    const login = await axios.post(`${baseURL}/login`, {
      email: "janedoe@ong.teste.com",
      senha: "123456",
    });
    token = login.data.token; // Ajuste isso conforme o caminho do token na resposta

    const response = await axios.get(`${baseURL}/usuarios/oficinas`, {
      headers: { Authorization: `Bearer ${token}` }, // Usa o token de autenticação
    });

    // precisa ser um array
    expect(response.data.oficinas).toBeInstanceOf(Array);

    // precisa ser um objeto com oficinas
    expect(response.data).toHaveProperty("oficinas");

    // precisa ter pelo menos um item
    expect(response.data.oficinas.length).toBeGreaterThan(0);

    // status code precisa ser 200
    expect(response.status).toBe(200);
  });
});