import axios from 'axios';
import { logger } from '../logs/app.log';
import { env } from '../config/env';

// Cria a instância do Axios com a URL base da API
const api = axios.create({
  baseURL: env.apiUrl,
});

// Adiciona o interceptor de resposta para logar erros automaticamente
api.interceptors.response.use(
  // Função para respostas de sucesso (não faz nada, apenas repassa a resposta)
  (response) => response,
  // Função para respostas de erro
  (error) => {
    // Verifica se o erro é uma resposta de erro do Axios
    if (error.response) {
      logger.error('api.error', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        method: error.config?.method,
      });
    } else if (error.request) {
      // O erro ocorreu na requisição (ex: sem resposta do servidor)
      logger.error('api.request.error', {
        message: 'Nenhuma resposta recebida do servidor.',
        url: error.config?.url,
        method: error.config?.method,
      });
    } else {
      // O erro ocorreu ao configurar a requisição
      logger.error('api.config.error', {
        message: error.message,
      });
    }

    // Rejeita a promise para que o erro possa ser tratado pelo código que fez a chamada
    return Promise.reject(error);
  }
);

export default api;
