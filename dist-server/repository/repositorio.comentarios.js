import pool from '../db/pool.js';
import { queriesComentarios } from '../db/queries/comentarios.queries.js';
export const repositorioComentarios = {
    async buscarComentariosPorCurso(cursoId) {
        const res = await pool.query(queriesComentarios.buscarComentariosPorCurso, [cursoId]);
        return res.rows;
    },
    async criarComentario(cursoId, usuarioId, comentario) {
        const res = await pool.query(queriesComentarios.criarComentario, [cursoId, usuarioId, comentario]);
        return res.rows[0];
    },
};
