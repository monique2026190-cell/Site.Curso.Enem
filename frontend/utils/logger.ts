
// frontend/utils/logger.ts

// 1. Definir os ícones e nomes para contextos e categorias
const CONTEXTOS = {
  FRONTEND: { icon: '🖥️', name: 'Frontend' },
  API: { icon: '🌐', name: 'API' },
  BANCO: { icon: '🗄️', name: 'Banco' },
};

const CATEGORIAS = {
  AUTH: { icon: '🔐', name: 'Auth' },
  HTTP: { icon: '🌐', name: 'HTTP' },
  ARQUIVOS: { icon: '🖼️', name: 'Arquivos' },
  LOGS: { icon: '📡', name: 'Logs' },
  SISTEMA: { icon: '⚙️', name: 'Sistema' },
  GERAL: { icon: '🧩', name: 'Geral' } // Categoria geral para logs não específicos
};

// Tipos para garantir que apenas valores definidos sejam usados
export type Contexto = keyof typeof CONTEXTOS;
export type Categoria = keyof typeof CATEGORIAS;

// Níveis de log para cores e ícones de status
const NIVEIS = {
  INFO: { icon: '✅', color: '#88C0D0' }, // Azul claro
  WARN: { icon: '⚠️', color: '#EBCB8B' }, // Amarelo
  ERROR: { icon: '❌', color: '#BF616A' }, // Vermelho
  DEBUG: { icon: '🐞', color: '#B48EAD' }, // Roxo
};

export type Nivel = keyof typeof NIVEIS;

/**
 * Função principal do logger hierárquico.
 * Formata e exibe logs no console com base no nível, contexto e categoria.
 */
const log = (
  nivel: Nivel,
  contexto: Contexto,
  categoria: Categoria,
  mensagem: string,
  ...dados: any[]
) => {
  const ctx = CONTEXTOS[contexto];
  const cat = CATEGORIAS[categoria];
  const lvl = NIVEIS[nivel];

  const timestamp = new Date().toLocaleTimeString();

  // Formato final: Ícone Contexto > Ícone Categoria > Ícone Nível Mensagem
  const linhaHierarquica = `${ctx.icon} ${ctx.name} > ${cat.icon} ${cat.name} > ${lvl.icon} ${mensagem}`;

  // Seleciona a função de console apropriada para o nível (error, warn, log)
  const logFunction = nivel === 'ERROR' ? console.error : (nivel === 'WARN' ? console.warn : console.log);

  // Aplica estilo CSS para dar cor ao log no console do navegador
  logFunction(
    `%c${linhaHierarquica}`,
    `color: ${lvl.color}; font-weight: bold;`,
    ...dados,
    `(@ ${timestamp})`
  );
};

// 4. Exporta funções de atalho para facilitar o uso no código
export const logger = {
  info: (contexto: Contexto, categoria: Categoria, mensagem: string, ...dados: any[]) =>
    log('INFO', contexto, categoria, mensagem, ...dados),
  warn: (contexto: Contexto, categoria: Categoria, mensagem: string, ...dados: any[]) =>
    log('WARN', contexto, categoria, mensagem, ...dados),
  error: (contexto: Contexto, categoria: Categoria, mensagem: string, ...dados: any[]) =>
    log('ERROR', contexto, categoria, mensagem, ...dados),
  debug: (contexto: Contexto, categoria: Categoria, mensagem: string, ...dados: any[]) =>
    log('DEBUG', contexto, categoria, mensagem, ...dados),
};

export default logger;
