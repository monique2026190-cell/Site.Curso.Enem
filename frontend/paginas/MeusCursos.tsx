import React from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles, Tabs, Tab, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Footer from '../componentes/Footer';
import MeusCursosCard from '../componentes/conteiner.meus.curso';
import Cabecalho from '../componentes/Cabecalho';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// Cursos comprados (dados fictícios)
const cursosComprados = [
  {
    id: 1,
    nome: 'Curso de React',
    progresso: 75,
    imagemUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    nome: 'Curso de Node.js',
    progresso: 50,
    imagemUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

// Cursos publicados (dados fictícios)
const cursosPublicados = [
  {
    id: 3,
    nome: 'Curso de TypeScript',
    progresso: 100, // Progresso não se aplica a cursos publicados, mas mantendo a estrutura
    imagemUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
];

// Cursos criados (dados fictícios)
const cursosCriados = [
  {
    id: 4,
    nome: 'Curso de GraphQL',
    progresso: 0, 
    imagemUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
];

const MeusCursos: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleCreateClick = () => {
    navigate('/criar-proposta');
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#121212' } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Meus Cursos
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="abas de cursos" variant="fullWidth">
              <Tab label="Comprados" />
              <Tab label="Publicados" />
              <Tab label="Criados" />
            </Tabs>
          </Box>

          {selectedTab === 0 && (
            <Box>
              {cursosComprados.map(curso => (
                <MeusCursosCard 
                  key={curso.id} 
                  id={curso.id} 
                  nome={curso.nome} 
                  progresso={curso.progresso} 
                  imagemUrl={curso.imagemUrl} 
                />
              ))}
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              {cursosPublicados.map(curso => (
                <MeusCursosCard 
                  key={curso.id} 
                  id={curso.id} 
                  nome={curso.nome} 
                  progresso={curso.progresso}
                  imagemUrl={curso.imagemUrl} 
                />
              ))}
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              {/* Botão de criar só aparece na aba "Criados" */}
              {cursosCriados.map(curso => (
                <MeusCursosCard 
                  key={curso.id} 
                  id={curso.id} 
                  nome={curso.nome} 
                  progresso={curso.progresso}
                  imagemUrl={curso.imagemUrl} 
                />
              ))}
            </Box>
          )}

        </Container>
        {/* Botão de Ação Flutuante para Criar Curso */}
        {selectedTab === 2 && (
            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{ 
                    position: 'fixed', 
                    bottom: '70px', 
                    right: '20px' 
                }}
                onClick={handleCreateClick} // Adiciona o evento de clique
            >
                <AddIcon />
            </Fab>
        )}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MeusCursos;
