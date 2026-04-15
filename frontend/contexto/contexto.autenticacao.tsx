
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../logs/app.log';
import { loginComGoogle, buscarPerfil } from '../servicos/servico.autenticacao';
import api from '../servicos/api';

// 1. Tipagem forte para o usuário
type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

// Define a interface para o estado de autenticação
interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthState | undefined>(undefined);

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente Provedor
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Começa true para verificar o token inicial
  const navigate = useNavigate();

  // Efeito para verificar o token e buscar o usuário ao carregar o app
  useEffect(() => {
    const carregarUsuario = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await buscarPerfil();
          setUser(response.data.user);
          logger.info('auth.session.restored', { userId: response.data.user.id });
        } catch (error) {
          logger.warn('auth.session.invalid_token');
          // Se o token for inválido, limpa tudo
          logout();
        }
      } 
      setLoading(false);
    };

    carregarUsuario();
  }, [token]); // Depende apenas do token

  // Função para realizar o login
  const login = async (credential: string) => {
    setLoading(true);
    logger.info('auth.login.attempt');
    try {
      const response = await loginComGoogle(credential);
      const { token: newToken } = response.data;

      setToken(newToken);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      // O useEffect cuidará de buscar e setar o usuário
      logger.info('auth.login.success', { hasToken: !!newToken });

    } catch (error: any) {
      // O erro já é logado pelo interceptor, aqui apenas limpamos o estado
      logger.error('auth.login.error', { message: error.message });
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      throw error; // Propaga para a UI poder reagir
    } finally {
      setLoading(false);
    }
  };

  // Função para realizar o logout
  const logout = () => {
    logger.info('auth.logout.success', { userId: user?.id });
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login'); // 4. Navegação via React Router
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
