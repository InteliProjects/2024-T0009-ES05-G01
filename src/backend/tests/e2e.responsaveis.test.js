const axios = require("axios");
const baseURL = "http://localhost:3000";

describe("Teste e2e das rotas de Responsáveis", () => {
  let token; // Para armazenar o token de autenticação, se necessário
  let firstResponsavelId; // Para armazenar o ID do primeiro responsável

  // Supondo que seja necessário autenticação, realize-a aqui
  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "michaeljohnson@ong.teste.com",
      senha: "987654",
    });
    token = response.data.token; // Ajuste isso conforme o caminho do token na resposta

    // Obtém a lista de Responsáveis e armazena o ID do primeiro para uso nos testes
    const responsaveisResponse = await axios.get(`${baseURL}/responsaveis`, {
      headers: { Authorization: `Bearer ${token}` }, // Se necessário
    });

    if (responsaveisResponse.data.responsaveis.length > 0) {
      firstResponsavelId = responsaveisResponse.data.responsaveis[0].id;
    }
  });

   it("Deve retornar um array com todos os responsáveis", async () => {
     const response = await axios.get(`${baseURL}/responsaveis`, {
       headers: { Authorization: `Bearer ${token}` },
     });

     expect(response.data).toHaveProperty("responsaveis");
     expect(response.data.responsaveis).toBeInstanceOf(Array);
     expect(response.data.responsaveis.length).toBeGreaterThan(0);
     response.data.responsaveis.forEach((responsavel) => {
       expect(responsavel).toHaveProperty("id");
     });
     expect(response.status).toBe(200);
   });

   it("Deve retornar um responsável específico", async () => {
     const response = await axios.get(
       `${baseURL}/responsaveis/${firstResponsavelId}`,
       {
         headers: { Authorization: `Bearer ${token}` },
       },
     );

     expect(response.data).toHaveProperty("responsavel");
     expect(response.data.responsavel).toHaveProperty("id", firstResponsavelId);
     expect(response.status).toBe(200);
   });

   it("Deve retornar um erro ao tentar obter um responsável inexistente", async () => {
     const inexistenteId = 99999;

     try {
       await axios.get(`${baseURL}/responsaveis/${inexistenteId}`, {
         headers: { Authorization: `Bearer ${token}` },
       });

       throw new Error(
         "A requisição deveria ter retornado erro, mas foi bem-sucedida.",
       );
     } catch (error) {
       expect(error.response).toBeDefined();
       expect(error.response.status).toBe(404);
     }
   });

   it("Deve cadastrar um novo responsável ou retornar erro de validação", async () => {
     // Dados válidos de um responsável
     const novoResponsavel = {
       nome: "Teste Responsável",
       telefone: "11999999999",
       email: "responsavelteste@teste.com",
     };

     // Tentativa de criação com dados válidos
     try {
       const response = await axios.post(
         `${baseURL}/responsaveis`,
         novoResponsavel,
         {
           headers: { Authorization: `Bearer ${token}` }, // Inclua isso apenas se a autenticação for necessária
         },
       );

       // Verifica se o responsável foi criado com sucesso
       expect(response.status).toBe(201);
       expect(response.data).toHaveProperty("responsavel");
       expect(response.data.responsavel).toMatchObject({
         nome: novoResponsavel.nome,
         email: novoResponsavel.email,
         // telefone pode ser verificado aqui também, se sua API retornar isso na resposta
       });
     } catch (error) {
       throw new Error("Erro ao tentar criar um responsável com dados válidos.");
     }

     // Dados inválidos de um responsável
     const responsavelInvalido = {
       nome: "", // Nome inválido
       telefone: "telefone_invalido", // Telefone inválido
       email: "email_invalido", // Email inválido
     };

     // Tentativa de criação com dados inválidos
     try {
       await axios.post(`${baseURL}/responsaveis`, responsavelInvalido, {
         headers: { Authorization: `Bearer ${token}` },
       });

       // Se a requisição não falhar como esperado, forçamos o teste a falhar
       throw new Error(
         "A requisição deveria ter retornado erro de validação, mas foi bem-sucedida.",
       );
     } catch (error) {
       // Verifica se o erro é devido a uma falha de validação
       expect(error.response).toBeDefined();
       expect(error.response.status).toBe(400);
       // Adicionalmente, você pode querer verificar a mensagem de erro específica
       // expect(error.response.data.error).toContain("mensagem específica de erro de validação");
     }
   });

   it("Deve atualizar um responsável existente", async () => {
     // ID de um responsável existente. Substitua com um valor apropriado.
     const responsavelId = firstResponsavelId; // Assume-se que essa variável foi definida anteriormente no seu setup de testes

     // Dados para atualizar o responsável
     const dadosAtualizados = {
       nome: "Nome Atualizado",
       telefone: "11999998888",
       email: "emailatualizado@teste.com",
     };

     try {
       const response = await axios.put(
         `${baseURL}/responsaveis/${responsavelId}`,
         dadosAtualizados,
         {
           headers: { Authorization: `Bearer ${token}` }, // Inclua isso apenas se a autenticação for necessária
         },
       );

       // Verifica se o status code é 200, indicando sucesso na atualização
       expect(response.status).toBe(200);
       // Verifica se os dados do responsável na resposta foram de fato atualizados
       expect(response.data).toHaveProperty("responsavel");
       expect(response.data.responsavel.nome).toEqual(dadosAtualizados.nome);
       expect(response.data.responsavel.telefone).toEqual(
         dadosAtualizados.telefone,
       );
       expect(response.data.responsavel.email).toEqual(dadosAtualizados.email);
     } catch (error) {
       throw new Error(
         `Erro ao tentar atualizar o responsável: ${error.message}`,
       );
     }
   });

   it("Deve retornar um erro ao tentar atualizar um responsável inexistente", async () => {
     try {
       await axios.put(
         `${baseURL}/responsaveis/9999999`, // Usando um ID presumivelmente inexistente
         {
           nome: "Nome Atualizado",
           telefone: "11987654321",
           email: "atualizado@teste.com",
         },
         {
           headers: { Authorization: `Bearer ${token}` }, // Apenas se autenticação for necessária
         },
       );
       // Se a requisição foi bem-sucedida, o teste falha pois esperamos um erro
       fail(
         "Esperava-se um erro de 404 Not Found, mas a requisição foi bem-sucedida.",
       );
     } catch (error) {
       // Verifica se o status do erro é 404
       expect(error.response.status).toBe(404);
     }
   });

   it("Deve deletar um responsável existente", async () => {
     // Primeiro, criamos um novo responsável para garantir que tenhamos um ID específico para deletar
     // Substitua os valores abaixo conforme necessário
     const novoResponsavel = {
       nome: "Responsável Para Deletar",
       telefone: "11987654321",
       email: "deletar@teste.com",
     };

     let criadoResponsavel = await axios.post(
       `${baseURL}/responsaveis`,
       novoResponsavel,
       {
         headers: { Authorization: `Bearer ${token}` }, // Inclua isso apenas se a autenticação for necessária
       },
     );

     const responsavelId = criadoResponsavel.data.responsavel.id;

     // Agora, vamos deletar o responsável
     try {
       const deleteResponse = await axios.delete(
         `${baseURL}/responsaveis/${responsavelId}`,
         {
           headers: { Authorization: `Bearer ${token}` },
         },
       );

       // Verifica se o status code é 204, indicando sucesso na deleção
       expect(deleteResponse.status).toBe(204);

       // Opcionalmente, tente recuperar o responsável para garantir que ele foi deletado
       try {
         await axios.get(`${baseURL}/responsaveis/${responsavelId}`, {
           headers: { Authorization: `Bearer ${token}` },
         });

         // Se conseguirmos recuperar o responsável, o teste deve falhar
         throw new Error("O responsável não foi deletado como esperado.");
       } catch (error) {
         // Esperamos um erro 404 aqui, indicando que o responsável não foi encontrado
         expect(error.response.status).toBe(404);
       }
     } catch (error) {
       throw new Error(`Erro ao tentar deletar o responsável: ${error.message}`);
     }
   });
});
