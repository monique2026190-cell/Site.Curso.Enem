
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app.routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexto/contexto.autenticacao';
import { env } from './config/env';
import { logger } from './utils/logger';

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      logger.info('FRONTEND', 'SISTEMA', 'Aplicação pronta');
    }
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Carregando aplicação...
      </div>
    );
  }

  return <AppRoutes />;
};

const App: React.FC = () => {
  const isGoogleAuthConfigured = env.googleClientId && !env.googleClientId.includes('SEU_GOOGLE_CLIENT_ID');

  const MainApp = (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );

  if (isGoogleAuthConfigured) {
    return (
      <GoogleOAuthProvider clientId={env.googleClientId}>
        {MainApp}
      </GoogleOAuthProvider>
    );
  } else {
    logger.warn('FRONTEND', 'AUTH', 'Autenticação do Google não configurada. A VITE_GOOGLE_CLIENT_ID não está definida no .env.', {
      googleClientId: env.googleClientId,
    });
    return MainApp;
  }
};

export default App;
