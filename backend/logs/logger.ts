
import pino from 'pino';

// A configuração do logger é definida com base no ambiente
let pinoOptions: pino.LoggerOptions;

if (process.env.NODE_ENV !== 'production') {
  // --- CONFIGURAÇÃO DE DESENVOLVIMENTO (VERSÃO IDEAL 9.5/10) ---
  pinoOptions = {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        // Ignora campos que serão formatados manualmente para evitar duplicatas
        ignore: 'pid,hostname,reqId,req,res,responseTime,userId,email,nome,context,category,levelLabel,ip,status,method,url',
        messageFormat: (log: pino.LogDescriptor, messageKey: string): string => {
          const {
            levelLabel = 'info',
            context,
            category,
            responseTime,
            userId,
            email,
            ip,
            status,
            method,
            url
          } = log;

          // --- 1. Mapeamento de Eventos e Emojis ---
          const eventMap: { [key: string]: string } = {
            'auth.login.attempt': 'Tentativa de login',
            'auth.login.success': 'Login realizado',
            'auth.login.error': 'Erro no login',
            'auth.session.restore': 'Restaurando sessão',
          };
          
          let emoji = '➡️'; // Emoji padrão
          let translatedMessage = log[messageKey] as string || '';

          // --- 2. Determina o Emoji e a Mensagem ---
          if (method && url) { // É uma requisição HTTP
            if (url && (/\.(ico|png|jpg|svg|css|woff2)$/).test(url)) {
              emoji = '🖼️'; // Asset estático
            } else {
              emoji = '🌐'; // Chamada de API
            }
          } else { // É um log de aplicação
              translatedMessage = eventMap[log[messageKey] as string] || translatedMessage;
              if (log[messageKey]?.includes('success')) emoji = '✅';
              else if (log[messageKey]?.includes('error')) emoji = '❌';
              else if (log[messageKey]?.includes('attempt')) emoji = '🔐';
              else if (levelLabel === 'warn') emoji = '⚠️';
              else if (levelLabel === 'debug') emoji = '🐛';
              else emoji = 'ℹ️';
          }

          // --- 3. Monta a Hierarquia ---
          const hierarchy = [context, category].filter(Boolean).join(' > ');

          // --- 4. Monta o Conteúdo Principal ---
          let mainContent = '';
          if (method && url) { // Requisição HTTP
            const statusCode = status || log.res?.statusCode;
            mainContent += `${method} ${url}`;
            if (statusCode) mainContent += ` | ${statusCode >= 400 ? '❗️' : '✅'} ${statusCode}`;
            if (responseTime) mainContent += ` | ⏱️ ${responseTime}ms`;
          } else { // Log da aplicação
            mainContent = translatedMessage;
          }
          
          // --- 5. Monta a Mensagem Final ---
          let finalMsg = `${emoji} ${hierarchy ? `${hierarchy} > ` : ''}${mainContent}`;

          // --- 6. Adiciona Detalhes Extras ---
          const details: string[] = [];
          if (userId) details.push(`👤 ID: ${userId}`);
          if (email) details.push(`📧 ${email}`);
          if (ip) details.push(`📍 ${ip}`);
          
          if(details.length > 0) {
            finalMsg += ` | ${details.join(' | ')}`;
          }

          // Adiciona a mensagem de erro original, se houver
          if (levelLabel === 'error' && log.err) {
            finalMsg += ` | ${log.err}`;
          }

          return finalMsg;
        },
        customLevels: { http: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
        useOnlyCustomLevels: false,
        levelFirst: true,
      },
    },
    formatters: {
      level(label: string) {
        return { levelLabel: label };
      },
    },
  };
} else {
  // --- CONFIGURAÇÃO DE PRODUÇÃO (JSON) ---
  pinoOptions = {
    level: 'info',
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
  };
}

// Cria a instância final do logger
const logger = pino(pinoOptions);

export { logger };
