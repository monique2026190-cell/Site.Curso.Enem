
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './paginas/Login';
import CompletarPerfil from './paginas/CompletarPerfil';
import Cursos from './paginas/Cursos';
import DetalhesCurso from './paginas/DetalhesCurso';
import ConteudoCurso from './paginas/ConteudoCurso';
import CriarProposta from './paginas/CriarProposta';
import Notificacoes from './paginas/Notificacoes';
import MeusCursos from './paginas/MeusCursos';
import MeuPerfil from './paginas/MeuPerfil';
import PesquisaCursos from './paginas/PesquisaCursos';
import { ConfiguracoesCurso } from './paginas/ConfiguracoesCurso';
import { ConfiguracoesApp } from './paginas/ConfiguracoesApp';
import RotaProtegida from './routes/RotaProtegida'; // Importe o componente de rota protegida
import { useAuth } from './contexto/contexto.autenticacao';
import Aula from './paginas/Aula';

// Um componente para lidar com a rota raiz
const PaginaInicial = () => {
  const { token } = useAuth();
  // Se o usuário estiver logado, redireciona para a página de cursos.
  // Caso contrário, redireciona para a página de login.
  return token ? <Navigate to="/cursos" replace /> : <Navigate to="/login" replace />;
};


const AppRoutes: React.FC = () => {
  return (
    // O <Router> foi removido daqui e movido para app.nucleo.tsx
    <Routes>
      {/* Rota pública para login */}
      <Route path="/login" element={<Login />} />

      {/* A rota raiz agora decide para onde redirecionar */}
      <Route path="/" element={<PaginaInicial />} />

      {/* Rotas Protegidas */}
      {/* Todas as rotas aninhadas aqui exigirão autenticação */}
      <Route element={<RotaProtegida />}>
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/curso/:id" element={<DetalhesCurso />} />
        <Route path="/conteudo-curso/:id" element={<ConteudoCurso />} />
        <Route path="/criar-proposta" element={<CriarProposta />} />
        <Route path="/curso/:id/configuracoes" element={<ConfiguracoesCurso />} />
        <Route path="/curso/:id/aula/:aulaId" element={<Aula />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/meus-cursos" element={<MeusCursos />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/pesquisar-cursos" element={<PesquisaCursos />} />
        <Route path="/configuracoes-app" element={<ConfiguracoesApp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
