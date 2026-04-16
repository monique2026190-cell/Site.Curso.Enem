import { repositorioComentarios } from '../repository/repositorio.comentarios.js';
export const servicoComentarios = {
    async buscarComentariosPorCurso(cursoId) {
        return repositorioComentarios.buscarComentariosPorCurso(cursoId);
    },
    async criarComentario(cursoId, usuarioId, comentario) {
        return repositorioComentarios.criarComentario(cursoId, usuarioId, comentario);
    },
};
