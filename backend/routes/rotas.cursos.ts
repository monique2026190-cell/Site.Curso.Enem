import { Router } from 'express';
import { getCursos, getCursoPorId, criarCurso, apagarCurso } from '../controllers/controlador.cursos.js';
import { verificarAutenticacao } from '../middleware/middleware.autenticacao.js';

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
router.get('/cursos', verificarAutenticacao, getCursos);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Retorna um curso pelo ID
 *     responses:
 *       200:
 *         description: Dados do curso
 */
router.get('/cursos/:id', verificarAutenticacao, getCursoPorId);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 */
router.post('/cursos', verificarAutenticacao, criarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Apaga um curso pelo ID
 *     responses:
 *       204:
 *         description: Curso apagado com sucesso
 */
router.delete('/cursos/:id', verificarAutenticacao, apagarCurso);

export default router;
