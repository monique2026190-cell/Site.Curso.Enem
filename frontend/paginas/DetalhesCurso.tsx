import React, { useState } from 'react';
import { Card, CardContent, Typography, Container, Button, CardMedia, CssBaseline, GlobalStyles, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMetodosPagamento from '../componentes/card.metodos.pagamento';
import Cabecalho from '../componentes/Cabecalho';
import DescricaoCursoCard from '../componentes/DescricaoCursoCard';
import ComentariosCard from '../componentes/ComentariosCard';
import { useDetalhesCurso } from '../hooks/useDetalhesCurso';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const DetalhesCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { curso, loading, error } = useDetalhesCurso(id);
  const [open, setOpen] = useState(false);

  const comentarios = [
    { user: 'Alice', text: 'Ótimo curso, aprendi muito!' },
    { user: 'Beto', text: 'O conteúdo é bem explicado.' },
  ];

  const handleComprar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Erro ao carregar o curso.</Typography>;
  }

  if (!curso) {
    return <Typography>Curso não encontrado.</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10 }}>
        <Card sx={{ bgcolor: 'background.paper' }}>
          <CardMedia
            component="img"
            height="300"
            image={curso.capa_curso}
            alt={`Imagem do ${curso.nome}`}
          />
          <CardContent>
            <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
              {curso.nome}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {curso.preco}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleComprar}>
              Comprar Agora
            </Button>
          </CardContent>
        </Card>
        <DescricaoCursoCard descricao={curso.descricao} />
        <ComentariosCard comments={comentarios} />
        <CardMetodosPagamento open={open} onClose={handleClose} />
      </Container>
    </ThemeProvider>
  );
};

export default DetalhesCurso;
