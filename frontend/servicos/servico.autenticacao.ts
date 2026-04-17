
import api from './api';

/**
 * Realiza a chamada de login para a API com a credencial do Google.
 * @param credential A credencial JWT obtida do Google Sign-In.
 * @returns A resposta da API, que deve incluir o token de autenticação.
 */
export const loginComGoogle = (credential: string) => {
  return api.post('/api/auth/google', { credential });
};

/**
 * Busca os dados do perfil do usuário autenticado.
 * @returns A resposta da API com os dados do usuário.
 */
export const buscarPerfil = () => {
  return api.get('/api/profile');
};

/**
 * Atualiza o perfil do usuário.
 * @param nomeUsuario O novo nome de usuário.
 * @returns A resposta da API com os dados do usuário atualizado.
 */
export const updateUserProfile = (nomeUsuario: string) => {
  return api.put('/api/profile', { nomeUsuario });
};
