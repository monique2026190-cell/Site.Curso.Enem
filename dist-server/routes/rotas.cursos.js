import { Router } from 'express';
import { getCursos, criarCurso, apagarCurso } from '../controllers/controlador.cursos.js';
import { authMiddleware } from '../middleware/middleware.autenticacao.js';
const router = Router();
/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Retorna todos os cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', authMiddleware, getCursos);
/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 */
router.post('/cursos', authMiddleware, criarCurso);
/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Apaga um curso pelo ID
 *     responses:
 *       204:
 *         description: Curso apagado com sucesso
 */
router.delete('/cursos/:id', authMiddleware, apagarCurso);
export default router;
