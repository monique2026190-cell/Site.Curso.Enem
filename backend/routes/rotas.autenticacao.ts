
import { Router } from 'express';
import { googleLoginHandler, meHandler } from '../controllers/controlador.autenticacao.js';
import { verificarAutenticacao } from '../middleware/middleware.autenticacao.js';

const router = Router();

router.post('/google', googleLoginHandler);

router.get('/me', verificarAutenticacao, meHandler);

export default router;
