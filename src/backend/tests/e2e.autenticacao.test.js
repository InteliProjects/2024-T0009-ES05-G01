const axios = require('axios');
const baseURL = 'http://localhost:3000';

async function loginHelper() {
  const credentials = {
    email: 'johndoe@ong.teste.com',
    senha: '123456',
  };
  const response = await axios.post(`${baseURL}/login`, credentials);
  return {
    accessToken: response.data.token,
    refreshToken: response.data.refreshToken,
  };
}

describe('Teste e2e das rotas de Autenticação', () => {
  it('Deve autenticar um usuário e retornar um token', async () => {
    const { accessToken } = await loginHelper();
    expect(accessToken).toBeDefined();
  });

  it('Deve atualizar o token de autenticação', async () => {
    const { refreshToken } = await loginHelper(); // Obter o refresh token através do helper
    const response = await axios.post(`${baseURL}/refresh-token`, null, {
      headers: { 'x-refresh-token': refreshToken },
    });
    expect(response.data).toHaveProperty('token');
  });

  it('Deve deslogar o usuário e invalidar o token', async () => {
    const { accessToken } = await loginHelper(); // Obter o access token através do helper
    const response = await axios.post(`${baseURL}/logout`, {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(response.status).toBe(200);
  });
});
