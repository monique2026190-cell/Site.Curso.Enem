import pool from '../db/pool.js';
import { buscarCursosQuery } from '../db/queries/cursos.queries.js';
import { logger } from '../logs/logger.js';

/**
 * Busca todos os cursos no banco de dados.
 */
export const buscarTodosCursos = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(buscarCursosQuery);
    return result.rows;
  } catch (error) {
    logger.error({ error }, 'Erro ao buscar todos os cursos no banco de dados');
    throw error;
  } finally {
    client.release();
  }
};
