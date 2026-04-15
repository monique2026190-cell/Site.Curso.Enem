
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // 1. Importe o Router
import AppRoutes from './app.routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexto/contexto.autenticacao';
import { env } from './config/env';

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Carregando aplicaçāo...
      </div>
    );
  }

  return <AppRoutes />;
};

const App: React.FC = () => {
  const isGoogleAuthConfigured = env.googleClientId && !env.googleClientId.includes('SEU_GOOGLE_CLIENT_ID');

  // O AuthProvider agora está dentro do Router
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
    console.warn("AVISO: A autenticação do Google não está configurada. Para habilitar, adicione VITE_GOOGLE_CLIENT_ID ao arquivo .env");
    return MainApp;
  }
};

export default App;
