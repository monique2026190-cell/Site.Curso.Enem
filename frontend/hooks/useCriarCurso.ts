import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarCurso } from '../servicos/servico.cursos';
import { AuthContext } from '../contexto/contexto.autenticacao';

interface CursoData {
  nome: string;
  descricao: string;
  capa_curso: string;
  preco: number;
}

export const useCriarCurso = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const usuario = authContext?.user;

  const salvarCurso = async (cursoData: CursoData) => {
    if (!usuario) {
      setError('Você precisa estar logado para criar um curso.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await criarCurso({ ...cursoData, usuario_id: usuario.id });
      navigate('/cursos'); // Sucesso, navegar para a lista de cursos
    } catch (err) {
      setError('Falha ao criar o curso. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { salvarCurso, loading, error };
};
