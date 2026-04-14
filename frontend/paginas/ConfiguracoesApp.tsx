import React from 'react';
import { Typography, Container, Box, CssBaseline, GlobalStyles, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Notifications, Person, Settings } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
});

const ConfiguracoesApp: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Container component="main" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography component="h1" variant="h4">
            Configurações do Aplicativo
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {/* Seção de Acesso de Notificação */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ mr: 2 }} />
                  <div>
                    <Typography variant="h6" component="h2">
                      Acesso de Notificação
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gerencie suas preferências de notificação.
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Seção de Meu Perfil */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 2 }} />
                  <div>
                    <Typography variant="h6" component="h2">
                      Meu Perfil
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visualize e edite suas informações de perfil.
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Seção de Configurações da Conta */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Settings sx={{ mr: 2 }} />
                  <div>
                    <Typography variant="h6" component="h2">
                      Configurações da Conta
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ajuste as configurações de sua conta.
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ConfiguracoesApp;
