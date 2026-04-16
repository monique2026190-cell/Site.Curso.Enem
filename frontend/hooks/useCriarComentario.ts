import { useMutation, useQueryClient } from 'react-query';
import { servicoComentarios } from '../servicos/servico.comentarios';

export const useCriarComentario = (cursoId: number | undefined, enabled: boolean = true) => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ comentario, usuarioId }: { comentario: string; usuarioId: number }) => {
            if (!cursoId || !enabled) {
                return Promise.reject(new Error('ID do curso inválido ou hook desabilitado.'));
            }
            return servicoComentarios.criarComentario(cursoId, usuarioId, comentario);
        },
        {
            onSuccess: () => {
                if (cursoId) {
                    queryClient.invalidateQueries(['comentarios', cursoId]);
                }
            },
        }
    );
};
