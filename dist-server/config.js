import dotenv from 'dotenv';
dotenv.config();
// ================================
// HELPERS
// ================================
const getEnv = (key, required = true) => {
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
let requiredEnv;
try {
    requiredEnv = {
        GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
        GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
        JWT_SECRET: getEnv('JWT_SECRET'),
        DATABASE_URL: getEnv('DATABASE_URL'),
        FRONTEND_URL: getEnv('FRONTEND_URL'),
    };
}
catch (error) {
    console.error(error.message);
    // Encerra a aplicação se uma variável obrigatória estiver faltando
    process.exit(1);
}
// ================================
// OPTIONAL: STRIPE
// ================================
const getStripeConfig = () => {
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
export const appConfig = {
    ...requiredEnv,
    services: {
        stripe: getStripeConfig(),
    },
};
