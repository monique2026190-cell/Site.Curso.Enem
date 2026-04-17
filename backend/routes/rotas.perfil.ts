
import { Router } from 'express';
import { updateProfileHandler } from '../controllers/controlador.perfil.js';
import { authMiddleware } from '../middleware/middleware.autenticacao.js';

const router = Router();

router.put('/profile', authMiddleware, updateProfileHandler);

export default router;
