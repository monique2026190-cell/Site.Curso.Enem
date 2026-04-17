
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Container, Avatar, CssBaseline, GlobalStyles } from '@mui/material';
import { Person } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateUserProfile } from '../servicos/servico.autenticacao';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const CompletarPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(nomeUsuario);
      navigate('/cursos');
    } catch (error) {
      console.error('Erro ao atualizar o perfil', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <Person />
            </Avatar>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
              Completar Perfil
            </Typography>
            <form onSubmit={handleSave} style={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nomeUsuario"
                label="Nome de Usuário"
                name="nomeUsuario"
                autoFocus
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Salvar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default CompletarPerfil;
