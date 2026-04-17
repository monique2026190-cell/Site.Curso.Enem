
import Stripe from 'stripe';
import { appConfig } from './config.js';

let stripeInstance: Stripe | null = null;

/**
 * Retorna uma instância singleton do SDK do Stripe.
 * A instância só é criada se a chave secreta do Stripe estiver definida na configuração.
 * Este é o ÚNICO local no app onde `new Stripe()` deve ser chamado.
 * @returns {Stripe | null} A instância do Stripe ou null se não estiver configurado.
 */
export const getStripe = (): Stripe | null => {
  // Se a configuração do serviço Stripe não existir em appConfig, não há nada a fazer.
  if (!appConfig.services.stripe) {
    return null;
  }

  // Padrão Singleton: Se a instância já existe, retorne-a.
  if (stripeInstance) {
    return stripeInstance;
  }

  // Cria a instância do Stripe usando a chave secreta da configuração centralizada.
  stripeInstance = new Stripe(appConfig.services.stripe.secretKey, {
    apiVersion: '2024-04-10' as any, // Mantendo a versão da API consistente
    typescript: true,
    // Adicionar mais configurações do Stripe aqui, se necessário
  });

  console.log('✅ [Stripe Helper] Instância do Stripe criada e pronta para uso.');

  return stripeInstance;
};
