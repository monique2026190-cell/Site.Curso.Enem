// src/utils/logger.ts

type LogLevel = 'info' | 'warn' | 'error';

const formatMessage = (level: LogLevel, message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(formatMessage('info', message), data ?? '');
  },

  warn: (message: string, data?: unknown) => {
    console.warn(formatMessage('warn', message), data ?? '');
  },

  error: (message: string, data?: unknown) => {
    console.error(formatMessage('error', message), data ?? '');
  },
};
