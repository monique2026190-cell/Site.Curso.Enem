
import { Request, Response } from 'express';
import { getStripe } from '../stripe.js';
import { appConfig } from '../config.js';

// Simulação de DB (substituir depois)
const usersDatabase: { [key: string]: { stripeAccountId?: string } } = {
  'user_123': {},
};

const findOrCreateUserAndGetStripeAccountId = async (userId: string) => {
  const stripe = getStripe();
  // Esta verificação é uma segurança adicional, embora a rota já deva barrar o acesso.
  if (!stripe) {
    throw new Error('Stripe is not configured. This function should not have been called.');
  }

  const user = usersDatabase[userId];
  if (!user) throw new Error('User not found');

  if (user.stripeAccountId) {
    return user.stripeAccountId;
  }

  console.log('Creating new Stripe account...');

  const account = await stripe.accounts.create({
    type: 'express',
    country: 'BR',
    email: 'usuario@exemplo.com',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  user.stripeAccountId = account.id;

  return account.id;
};

export const criarSessaoConexao = async (req: Request, res: Response) => {
  const stripe = getStripe();

  // Feature Toggle: Se o Stripe não estiver configurado no servidor, retorne 503.
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not enabled on this server' });
  }

  try {
    const userId = 'user_123';

    const accountId = await findOrCreateUserAndGetStripeAccountId(userId);

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      // Usando a URL do frontend a partir da configuração centralizada
      refresh_url: `${appConfig.FRONTEND_URL}/stripe/reauth`,
      return_url: `${appConfig.FRONTEND_URL}/painel-vendedor?stripe_return=true`,
      type: 'account_onboarding',
    });

    res.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Failed to create Stripe connect session' });
  }
};
