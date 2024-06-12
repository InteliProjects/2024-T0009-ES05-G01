import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para adicionar o token às requisições
const addTokenToRequests = (token, refreshToken) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  sessionStorage.setItem('token', token);
  if (refreshToken) {
    sessionStorage.setItem('refreshToken', refreshToken);
  }
};

// Função para renovar o token
const refreshAccessToken = async () => {
  // Recuperar o refresh token do sessionStorage
  const oldRefreshToken = sessionStorage.getItem('refreshToken');
  // Modificar a solicitação para enviar o refresh token de maneira apropriada
  const response = await api.post(
    '/refresh-token',
    {},
    {
      headers: {
        'x-refresh-token': oldRefreshToken,
      },
    },
  );
  const { token, refreshToken } = response.data;
  addTokenToRequests(token, refreshToken);
  return token;
};

// Armazena temporariamente as solicitações pendentes
let isRefreshing = false;
let failedRequests = [];

// Interceptador para renovar automaticamente o token quando expirar
api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.config.url === '/refresh-token'
    ) {
      window.location.href = '/login';
      delete api.defaults.headers.common['Authorization'];
      return Promise.reject(error);
    }

    // Verifique se a resposta possui status 401 (não autorizado) e se é uma solicitação original (não uma tentativa de renovação)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Renove o token antes de reenviar a solicitação original
          const newToken = await refreshAccessToken();

          // Atualize o cabeçalho da solicitação original com o novo token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          // Reenvie a solicitação original
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Erro ao renovar o token:', refreshError);

          // Trate o erro conforme necessário
          if (refreshError.response && refreshError.response.status === 401) {
            window.location.href = '/login';
            return Promise.reject(refreshError); // Rejeite a promessa para evitar um loop infinito
          }
        } finally {
          isRefreshing = false;
        }
      } else {
        // Adie a execução da solicitação original
        const retryOriginalRequest = new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        });

        // Quando o token estiver renovado, reenvie as solicitações falhadas
        return retryOriginalRequest;
      }
    }

    return Promise.reject(error);
  },
);

// Interceptador para incluir o token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
