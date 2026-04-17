
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Container, Avatar, CssBaseline, GlobalStyles } from '@mui/material';
import { Person } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateUserProfile } from '../servicos/servico.autenticacao';
import { AuthContext } from '../contexto/contexto.autenticacao';

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
  const authContext = useContext(AuthContext);
  const [nomeUsuario, setNomeUsuario] = useState('');

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser } = authContext;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(nomeUsuario);
      if (setUser) {
        setUser(updatedUser);
      }
      navigate('/cursos');
    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
        <Card sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Completar Perfil
          </Typography>
          <CardContent>
            <form onSubmit={handleSave}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nome de Usuário"
                name="username"
                autoComplete="username"
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
