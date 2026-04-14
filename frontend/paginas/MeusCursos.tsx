import React from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import MeusCursosCard from '../componentes/conteiner.meus.curso.tsx';
import Cabecalho from '../componentes/Cabecalho';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

// Dados de exemplo
const meusCursos = [
  { id: 1, nome: 'Curso de React', progresso: 75 },
  { id: 2, nome: 'Curso de Node.js', progresso: 50 },
  { id: 4, nome: 'Curso de TypeScript', progresso: 25 },
];

const MeusCursos: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 4, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Meus Cursos
          </Typography>
          {
            meusCursos.map(curso => (
              <MeusCursosCard key={curso.id} id={curso.id} nome={curso.nome} progresso={curso.progresso} />
            ))
          }
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MeusCursos;
