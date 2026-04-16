import api from './api';

/**
 * Busca a lista de todos os cursos disponíveis.
 * @returns A resposta da API com a lista de cursos.
 */
export const buscarCursos = () => {
  return api.get('/api/cursos');
};

/**
 * Cria um novo curso.
 * @param curso Os dados do curso a ser criado.
 * @returns A resposta da API.
 */
export const criarCurso = (curso: { nome: string; descricao: string; capa_curso: string; usuario_id: number }) => {
  return api.post('/api/cursos', curso);
};

/**
 * Apaga um curso.
 * @param id O ID do curso a ser apagado.
 * @returns A resposta da API.
 */
export const apagarCurso = (id: number) => {
  return api.delete(`/api/cursos/${id}`);
};
