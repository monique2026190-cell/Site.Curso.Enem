// GARANTE que as variáveis de ambiente sejam carregadas e validadas ANTES de tudo.
import './config.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/rotas.js';
import { authMiddleware } from './middleware/middleware.autenticacao.js';
import { httpLogger } from './middleware/logger.middleware.js';
import { logger } from './logs/logger.js';
import initDB from './db/init.db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middlewares Essenciais ---
app.use(httpLogger); // Loga todas as requisições HTTP
app.use(express.json()); // Parsing de JSON

// --- Rotas da API ---
// Todas as rotas da API agora estão centralizadas e prefixadas com /api
app.use('/api', routes);

// --- Servir Arquivos Estáticos do Frontend ---
// O servidor Express também servirá os arquivos estáticos do build do React.
const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendBuildPath));

// --- Rota Catch-All ---
// Para qualquer outra requisição, serve o index.html do frontend.
// Isso é crucial para que o roteamento do lado do cliente (React Router) funcione.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Inicializa a conexão com o banco de dados
    await initDB();
    logger.info('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // 2. Inicia o servidor Express
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`🔗 Frontend disponível em http://localhost:${PORT}`);
    });

  } catch (error) {
    // CORREÇÃO: Passando o objeto de erro primeiro para o logger
    logger.error(error, '❌ Falha ao iniciar o servidor:');
    process.exit(1); // Encerra a aplicação em caso de erro crítico na inicialização
  }
};

startServer();
