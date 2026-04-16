export const buscarCursosQuery = 'SELECT * FROM cursos;';
export const inserirCursoQuery = `
  INSERT INTO cursos (nome, descricao, capa_curso, usuario_id, criado_em, atualizado_em)
  VALUES ($1, $2, $3, $4, NOW(), NOW())
  RETURNING *;
`;
export const apagarCursoQuery = 'DELETE FROM cursos WHERE id = $1;';
