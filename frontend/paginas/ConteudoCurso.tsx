import React from 'react';
import {
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  GlobalStyles, 
  Card,
  CardContent
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BotaoConfiguracoesCurso from '../componentes/BotaoConfiguracoesCurso';
import BotaoPublicarConteudo from '../componentes/BotaoPublicarConteudo';
import Cabecalho from '../componentes/Cabecalho';
import Footer from '../componentes/Footer';
import SecaoConteudo from '../componentes/SecaoConteudo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const ConteudoCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const secoes = [
    {
      id: 1,
      titulo: 'Seção 1: Módulo de Boas-Vindas',
      pastas: [
        { id: 1, titulo: 'Introdução ao Curso' },
        { id: 2, titulo: 'Recursos Adicionais' },
      ],
    },
    {
      id: 2,
      titulo: 'Seção 2: Desenvolvimento Front-End',
      pastas: [
        { id: 3, titulo: 'HTML e CSS' },
        { id: 4, titulo: 'JavaScript Básico' },
      ],
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10, flexGrow: 1, pb: 12 }}>
        <Card sx={{ mb: 4, bgcolor: '#1E1E1E', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="h1" variant="h4">
                Conteúdo do Curso {id}
              </Typography>
              {id && <BotaoConfiguracoesCurso id={id} />}
            </Box>
          </CardContent>
        </Card>

        <SecaoConteudo secoes={secoes} />

      </Container>

      {id && <BotaoPublicarConteudo id={id} />}

      <Footer />
    </ThemeProvider>
  );
};

export default ConteudoCurso;
