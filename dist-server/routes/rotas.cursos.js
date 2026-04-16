import { Router } from 'express';
import { getCursos, getCursoPorId, criarCurso, apagarCurso } from '../controllers/controlador.cursos.js';
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
 * /api/cursos/{id}:
 *   get:
 *     summary: Retorna um curso pelo ID
 *     responses:
 *       200:
 *         description: Dados do curso
 */
router.get('/cursos/:id', authMiddleware, getCursoPorId);
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
