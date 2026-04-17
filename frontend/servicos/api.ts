
import axios, { AxiosResponse, AxiosError } from 'axios';
import { logger } from '../utils/logger';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.apiUrl,
});

// Interceptor de Requisição: Loga toda requisição que sai da aplicação
api.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    // Log da requisição com o novo formato hierárquico
    logger.info('API', 'HTTP', `Requisição: ${method?.toUpperCase()} ${url}`);
    return config;
  },
  (error) => {
    logger.error('API', 'HTTP', 'Erro ao preparar a requisição', { error });
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Loga toda resposta (sucesso ou erro)
api.interceptors.response.use(
  // --- Handler de Sucesso ---
  (response: AxiosResponse) => {
    const { status } = response;
    const { method, url } = response.config;
    // Log da resposta de sucesso com o novo formato
    logger.info('API', 'HTTP', `Sucesso: ${method?.toUpperCase()} ${url} | ${status}`);
    return response;
  },

  // --- Handler de Erro ---
  (error: AxiosError) => {
    if (error.response) {
      // Erro com resposta do servidor (4xx, 5xx)
      const { status, data } = error.response;
      const { method, url } = error.config || {};
      logger.error('API', 'HTTP', `Erro: ${method?.toUpperCase()} ${url} | ${status}`, {
        status,
        resposta: data,
      });
    } else if (error.request) {
      // Erro na requisição (sem resposta, timeout)
      const { method, url } = error.config || {};
      logger.warn('API', 'HTTP', `Sem Resposta: ${method?.toUpperCase()} ${url}`, {
        detalhes: 'Nenhuma resposta recebida do servidor.',
      });
    } else {
      // Erro na configuração da requisição
      logger.error('API', 'HTTP', 'Erro de Configuração', {
        mensagem: error.message,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
