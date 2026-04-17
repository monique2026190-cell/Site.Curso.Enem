
import dotenv from 'dotenv';
dotenv.config();

// ================================
// TYPES
// ================================
type RequiredEnv = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  FRONTEND_URL: string;
};

type StripeConfig = {
  secretKey: string;
  webhookSecret?: string;
};

type AppConfig = RequiredEnv & {
  services: {
    stripe: StripeConfig | null;
  };
};

// ================================
// HELPERS
// ================================
const getEnv = (key: string, required = true): string | undefined => {
  const value = process.env[key];

  if (required && !value) {
    // Este erro é mais específico e útil para o debug
    throw new Error(`❌ ERRO CRÍTICO: A variável de ambiente obrigatória '${key}' não foi definida.`);
  }

  return value;
};

// ================================
// REQUIRED CONFIG
// ================================
let requiredEnv: RequiredEnv;

try {
  requiredEnv = {
    GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID')!,
    GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET')!,
    JWT_SECRET: getEnv('JWT_SECRET')!,
    DATABASE_URL: getEnv('DATABASE_URL')!,
    FRONTEND_URL: getEnv('FRONTEND_URL')!,
  };
} catch (error: any) {
  console.error(error.message);
  // Encerra a aplicação se uma variável obrigatória estiver faltando
  process.exit(1);
}

// ================================
// OPTIONAL: STRIPE
// ================================
const getStripeConfig = (): StripeConfig | null => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    console.warn('⚠️  [App Config] Stripe está INATIVO (STRIPE_SECRET_KEY não encontrada).');
    return null;
  }

  console.log('✅ [App Config] Stripe está ATIVO.');

  return {
    secretKey,
    webhookSecret,
  };
};

// ================================
// FINAL CONFIG
// ================================
export const appConfig: AppConfig = {
  ...requiredEnv,
  services: {
    stripe: getStripeConfig(),
  },
};
