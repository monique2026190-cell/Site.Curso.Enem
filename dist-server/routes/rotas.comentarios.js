import { Router } from 'express';
import { controladorComentarios } from '../controllers/controlador.comentarios.js';
const rotasComentarios = Router();
rotasComentarios.get('/api/cursos/:cursoId/comentarios', controladorComentarios.buscarComentariosPorCurso);
rotasComentarios.post('/api/cursos/:cursoId/comentarios', controladorComentarios.criarComentario);
export default rotasComentarios;
