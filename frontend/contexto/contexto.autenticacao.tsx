
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger, Contexto, Categoria } from '../utils/logger'; // Importando o novo logger
import { loginComGoogle } from '../servicos/servico.autenticacao';
import api from '../servicos/api';

type User = {
  id: string;
  email: string;
  nome?: string;
  foto_perfil?: string;
};

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  loginLoading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        logger.error('FRONTEND', 'AUTH', 'Erro ao parsear usuário do localStorage.', { error });
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurarSessao = async () => {
      logger.info('FRONTEND', 'AUTH', 'Tentando restaurar sessão...');
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        logger.info('FRONTEND', 'AUTH', 'Token encontrado no localStorage.');
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        try {
          const { data: userFromApi } = await api.get('/auth/me');
          setToken(storedToken);
          setUser(userFromApi);
          localStorage.setItem('user', JSON.stringify(userFromApi));
          logger.info('FRONTEND', 'AUTH', `Sessão restaurada para ${userFromApi.email}`);
        } catch (error: any) {
          logger.error('FRONTEND', 'AUTH', 'Token inválido ou expirado.', { error: error.response?.data?.message || error.message });
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common['Authorization'];
        }

      } else {
        logger.info('FRONTEND', 'AUTH', 'Nenhum token encontrado para restaurar.');
      }
      setLoading(false);
    };

    restaurarSessao();
  }, []);

  const login = async (credential: string) => {
    setLoginLoading(true);
    logger.info('FRONTEND', 'AUTH', 'Tentativa de login iniciada.');

    if (import.meta.env.DEV && credential === 'dummy-token') {
      logger.info('FRONTEND', 'AUTH', 'Usando modo de desenvolvimento (dummy token).');
      const dummyUser = { id: 'dummy-id', email: 'dev@example.com', nome: 'Dev User' };
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify(dummyUser));
      api.defaults.headers.common['Authorization'] = 'Bearer dummy-token';
      setToken('dummy-token');
      setUser(dummyUser);
      setLoginLoading(false);
      navigate('/cursos');
      return;
    }

    try {
      const response = await loginComGoogle(credential);
      const { token: newToken, perfilCompleto, user: loggedInUser } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      setToken(newToken);
      setUser(loggedInUser);

      logger.info('FRONTEND', 'AUTH', `Login realizado com sucesso para ${loggedInUser?.email}.`);

      if (perfilCompleto) {
        navigate('/cursos');
      } else {
        navigate('/completar-perfil');
      }

    } catch (error: any) {
      logger.error('FRONTEND', 'AUTH', 'Erro durante o login.', { message: error.message, stack: error.stack });
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      throw error;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    logger.info('FRONTEND', 'AUTH', `Logout realizado para ${user?.email}.`);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    token,
    user,
    loading,
    loginLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
