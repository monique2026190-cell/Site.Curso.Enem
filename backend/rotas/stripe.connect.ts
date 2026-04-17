
import express from 'express';
import { getStripe } from '../stripe.js';
import { appConfig } from '../config.js';
import { authMiddleware } from '../middleware/middleware.autenticacao.js';
import pool from '../db/pool.js';

const router = express.Router();

// Middleware para verificar se o Stripe está habilitado e anexar a instância ao request
const stripeEnabled = (req: any, res: any, next: any) => {
  const stripe = getStripe();
  // Se getStripe() retornar null, o serviço está desativado.
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not enabled on this server' });
  }
  req.stripe = stripe; // Anexa a instância do Stripe ao objeto de requisição
  next();
};

/**
 * @route   POST /api/stripe/connect/account
 * @desc    Cria uma conta Stripe Connect e gera um link de onboarding
 * @access  Privado
 */
router.post('/account', authMiddleware, stripeEnabled, async (req: any, res) => {
  const userId = req.usuario.id;
  const userEmail = req.usuario.email;
  // A instância do Stripe é obtida do objeto de requisição, garantido pelo middleware
  const { stripe } = req;

  try {
    // 1. Verifica se o usuário já possui uma conta Stripe
    const userResult = await pool.query('SELECT stripe_account_id FROM usuarios WHERE id = $1', [userId]);
    let accountId = userResult.rows[0]?.stripe_account_id;

    // 2. Se não tiver, cria uma nova conta Express no Stripe
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'BR',
        email: userEmail,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      accountId = account.id;

      // Salva o ID da nova conta no banco de dados
      await pool.query('UPDATE usuarios SET stripe_account_id = $1 WHERE id = $2', [accountId, userId]);
    }

    // 3. Cria um link de onboarding para o usuário completar o cadastro no Stripe
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appConfig.FRONTEND_URL}/stripe/reauth`,
      return_url: `${appConfig.FRONTEND_URL}/painel-vendedor?stripe_return=true`,
      type: 'account_onboarding',
    });

    // 4. Retorna a URL do link de onboarding para o frontend
    res.json({ url: accountLink.url });

  } catch (error) {
    console.error('Erro ao criar conta Stripe Connect:', error);
    res.status(500).json({ error: 'Falha ao iniciar o processo de conexão com o Stripe.' });
  }
});

/**
 * @route   GET /api/stripe/connect/account/status
 * @desc    Verifica o status da conta Stripe de um usuário
 * @access  Privado
 */
router.get('/account/status', authMiddleware, stripeEnabled, async (req: any, res) => {
    const userId = req.usuario.id;
    const { stripe } = req; // A instância do Stripe é obtida do objeto de requisição

    try {
        const userResult = await pool.query('SELECT stripe_account_id FROM usuarios WHERE id = $1', [userId]);
        const accountId = userResult.rows[0]?.stripe_account_id;

        if (!accountId) {
            return res.json({ isConnected: false });
        }

        const account = await stripe.accounts.retrieve(accountId);

        const isConnected = account.charges_enabled && account.payouts_enabled;

        res.json({ isConnected });

    } catch (error) {
        console.error('Erro ao verificar status da conta Stripe:', error);
        res.status(500).json({ error: 'Falha ao verificar o status da conta Stripe.' });
    }
});

export default router;
