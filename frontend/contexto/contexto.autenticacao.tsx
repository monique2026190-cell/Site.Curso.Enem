
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../logs/app.log';
import { loginComGoogle } from '../servicos/servico.autenticacao';
import api from '../servicos/api';

// Tipagem forte para o usuário
type User = {
  id: any;
  email: string;
  nome?: string;
  foto_perfil?: string;
};

// Interface para o estado de autenticação
interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
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
  const navigate = useNavigate();

  useEffect(() => {
    const restaurarSessao = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        logger.info('auth.session.restore.attempt', { hasToken: true });
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          // Como não temos mais um endpoint /profile, vamos apenas setar o token
          // e assumir que o usuário está logado. A verificação de perfil completo
          // será feita no próximo login.
          setToken(storedToken);
          // O ideal seria ter um endpoint que retorna o usuário a partir do token
          // para popular o estado `user`, mas para este fluxo, vamos simplificar.
        } catch (error) {
          logger.warn('auth.session.restore.invalid_token', { error: 'Token inválido ou expirado' });
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    restaurarSessao();
  }, []);

  const login = async (credential: string) => {
    setLoading(true);
    logger.info('auth.login.attempt');
    try {
      const response = await loginComGoogle(credential);
      const { token: newToken, perfilCompleto, user: loggedInUser } = response.data;

      localStorage.setItem('token', newToken);
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
      delete api.defaults.headers.common['Authorization'];
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logger.info('auth.logout.success', { userId: user?.id, email: user?.email });
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    token,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
