
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../utils/logger';
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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurarSessao = async () => {
      logger.info('auth.session.restore.start');
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        logger.info('auth.session.restore.token_found');
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        try {
          const { data: userFromApi } = await api.get('/auth/me');
          setToken(storedToken);
          setUser(userFromApi);
          localStorage.setItem('user', JSON.stringify(userFromApi)); // Atualiza o usuário no localStorage
          logger.info('auth.session.restore.success', { userId: userFromApi.id });
        } catch (error: any) {
          logger.error('auth.session.restore.token_invalid', { error: error.response?.data?.message || error.message });
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common['Authorization'];
        }

      } else {
        logger.info('auth.session.restore.no_token');
      }
      setLoading(false);
      logger.info('auth.session.restore.finish');
    };

    restaurarSessao();
  }, []);

  const login = async (credential: string) => {
    setLoginLoading(true);
    logger.info('auth.login.start');

    if (import.meta.env.DEV && credential === 'dummy-token') {
      logger.info('auth.login.dummy_mode');
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

      logger.info('auth.login.success', { userId: loggedInUser?.id, email: loggedInUser?.email, perfilCompleto });

      if (perfilCompleto) {
        navigate('/cursos');
      } else {
        navigate('/completar-perfil');
      }

    } catch (error: any) {
      logger.error('auth.login.error', { message: error.message, stack: error.stack });
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
    logger.info('auth.logout.success', { userId: user?.id });
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
