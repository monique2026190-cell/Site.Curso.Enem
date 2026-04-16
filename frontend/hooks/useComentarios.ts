
import { useQuery } from 'react-query';
import { servicoComentarios } from '../servicos/servico.comentarios';

export const useComentarios = (cursoId: number, enabled: boolean = true) => {
    return useQuery(['comentarios', cursoId], () => servicoComentarios.buscarComentariosPorCurso(cursoId), {
        enabled,
    });
};
