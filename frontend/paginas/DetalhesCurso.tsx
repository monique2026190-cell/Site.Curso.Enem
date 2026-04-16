import React, { useState } from 'react';
import { Card, CardContent, Typography, Container, Button, CardMedia, CssBaseline, GlobalStyles, CircularProgress, TextField, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cabecalho from '../componentes/Cabecalho';
import DescricaoCursoCard from '../componentes/DescricaoCursoCard';
import ComentariosCard from '../componentes/ComentariosCard';
import { useDetalhesCurso } from '../hooks/useDetalhesCurso';
import { useComentarios } from '../hooks/useComentarios';
import { useCriarComentario } from '../hooks/useCriarComentario';
import { useAuth } from '../contexto/contexto.autenticacao';

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
  const cursoId = id ? parseInt(id, 10) : undefined;

  const { curso, loading, error } = useDetalhesCurso(id);
  const { data: comentarios, isLoading: loadingComentarios } = useComentarios(cursoId, !!cursoId);
  const { mutate: criarComentario } = useCriarComentario(cursoId, !!cursoId);
  const { user } = useAuth();
  const [novoComentario, setNovoComentario] = useState('');

  const handleComprar = () => {
    // Lógica de compra
  };

  const handleCriarComentario = () => {
    if (user && novoComentario.trim() !== '' && cursoId) {
      criarComentario({ comentario: novoComentario, usuarioId: user.id });
      setNovoComentario('');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>Erro ao carregar o curso.</Typography>;
  }

  if (!curso) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>Curso não encontrado.</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10 }}>
        <Card sx={{ bgcolor: 'background.paper' }}>
          {curso.capa_curso && (
            <CardMedia
              component="img"
              height="300"
              image={curso.capa_curso}
              alt={`Imagem do ${curso.nome}`}
            />
          )}
          <CardContent>
            <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
              {curso.nome}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              R$ {curso.preco?.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleComprar}>
              Comprar Agora
            </Button>
          </CardContent>
        </Card>
        {curso.descricao && <DescricaoCursoCard descricao={curso.descricao} />}
        
        <div className="my-8">
          <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
            Comentários
          </Typography>
          {user && (
            <div className="mb-4">
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Deixe seu comentário"
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleCriarComentario}>
                Enviar Comentário
              </Button>
            </div>
          )}
          {loadingComentarios ? (
            <CircularProgress />
          ) : (
            comentarios?.map((comentario: any) => (
              <ComentariosCard key={comentario.id} comentario={comentario} />
            ))
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default DetalhesCurso;
