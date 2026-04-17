import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

// Configuração do logger
const loggerConfig = {
  level: isProduction ? 'info' : 'debug', // Nível de log mais verboso em dev
  ...(isProduction ? {} : { transport: { target: 'pino-pretty' } }) // Formato bonito em dev
};

const logger = pino(loggerConfig);

export default logger;
