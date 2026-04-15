import axios from 'axios';

type LogLevel = 'info' | 'warn' | 'error';

interface LogPayload {
  message: string;
  level: LogLevel;
  timestamp: string;
  [key: string]: any;
}

const sendLogToBackend = async (payload: LogPayload) => {
  try {
    await axios.post('/api/log', payload);
  } catch (error) {
    console.error('Erro ao enviar log para o backend:', error);
    console.error('Log original que falhou:', payload);
  }
};

const log = (level: LogLevel, message: string, meta?: Record<string, any>) => {
  const logData: LogPayload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  // Em desenvolvimento, logamos tudo no console para facilitar o debug
  if (import.meta.env.MODE === 'development') {
    console[level](logData);
  }

  // Enviamos apenas logs de erro para o backend para evitar sobrecarga.
  if (level === 'error') {
    sendLogToBackend(logData);
  }
};

export const logger = {
  info: (message: string, meta?: Record<string, any>) =>
    log('info', message, meta),

  warn: (message: string, meta?: Record<string, any>) =>
    log('warn', message, meta),

  error: (message: string, meta?: Record<string, any>) =>
    log('error', message, meta),
};
