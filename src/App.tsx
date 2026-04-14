import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../frontend/paginas/Login';
import CompletarPerfil from '../frontend/paginas/CompletarPerfil';
import Cursos from '../frontend/paginas/Cursos';
import DetalhesCurso from '../frontend/paginas/DetalhesCurso';
import ConteudoCurso from '../frontend/paginas/ConteudoCurso';
import CriarProposta from '../frontend/paginas/CriarProposta';
import Configuracoes from '../frontend/paginas/Configuracoes'; // Importe o novo componente
import CriarConteudo from '../frontend/paginas/CriarConteudo'; // Importe o novo componente

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/curso/:id" element={<DetalhesCurso />} />
        <Route path="/conteudo-curso/:id" element={<ConteudoCurso />} />
        <Route path="/criar-proposta" element={<CriarProposta />} />
        <Route path="/configuracoes/:id" element={<Configuracoes />} /> {/* Adicione a nova rota */}
        <Route path="/criar-conteudo/:id" element={<CriarConteudo />} /> {/* Adicione a nova rota */}
      </Routes>
    </Router>
  );
};

export default App;