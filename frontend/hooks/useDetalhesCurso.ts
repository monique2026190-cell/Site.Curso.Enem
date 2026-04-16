import { useState, useEffect } from 'react';
import { buscarCursoPorId } from '../servicos/servico.cursos';
import { Curso } from '../tipos/curso';

export const useDetalhesCurso = (id: string | undefined) => {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCurso = async () => {
      try {
        setLoading(true);
        const response = await buscarCursoPorId(id);
        setCurso(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  return { curso, loading, error };
};
