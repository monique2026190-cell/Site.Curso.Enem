import api from './api';

export const servicoComentarios = {
    async buscarComentariosPorCurso(cursoId: number) {
        const response = await api.get(`/api/cursos/${cursoId}/comentarios`);
        return response.data;
    },

    async criarComentario(cursoId: number, usuarioId: number, comentario: string) {
        const response = await api.post(`/api/cursos/${cursoId}/comentarios`, { usuarioId, comentario });
        return response.data;
    },
};
