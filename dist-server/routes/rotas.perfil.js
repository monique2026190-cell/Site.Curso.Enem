import { Router } from 'express';
import { updateProfileHandler } from '../controllers/controlador.perfil.js';
import { verificarAutenticacao } from '../middleware/middleware.autenticacao.js';
const router = Router();
router.put('/profile', verificarAutenticacao, updateProfileHandler);
export default router;
