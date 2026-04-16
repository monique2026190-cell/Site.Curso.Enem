
import React from 'react';
import {
  CssBaseline, GlobalStyles, ThemeProvider, createTheme, Box, AppBar, Toolbar, IconButton, Typography,
  Container, List, ListItem, ListItemIcon, ListItemText, Switch, Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit, Photo, AddCircleOutline, Sort, Public, MonetizationOn, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// O mesmo tema escuro e sofisticado da página de cursos
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#5E97F6', // Um azul mais sóbrio e profissional
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'text.secondary',
      letterSpacing: '1px',
      display: 'block',
      mb: 1,
      mt: 3,
      px: 2,
    }}
  >
    {children}
  </Typography>
);

const SettingsListItem: React.FC<{ icon: React.ReactElement; label: string; action?: React.ReactNode }> = ({ icon, label, action }) => (
  <ListItem
    secondaryAction={action}
    sx={{
      bgcolor: 'background.paper',
      borderRadius: 2.5,
      mb: 1,
      p: '12px 16px',
      transition: 'background-color 0.3s',
      '&:hover': {
        bgcolor: '#282828',
      }
    }}
  >
    <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{icon}</ListItemIcon>
    <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 500 }} />
  </ListItem>
);

export const ConfiguracoesCurso: React.FC = () => {
    const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="voltar" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Configurações do Curso
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
          <List>
            <SectionTitle>Geral</SectionTitle>
            <SettingsListItem icon={<Edit />} label="Editar Título e Descrição" />
            <SettingsListItem icon={<Photo />} label="Alterar Imagem de Capa" />

            <SectionTitle>Conteúdo</SectionTitle>
            <SettingsListItem icon={<AddCircleOutline />} label="Adicionar Novo Módulo" />
            <SettingsListItem icon={<Sort />} label="Reordenar Módulos" />

            <SectionTitle>Acesso e Publicação</SectionTitle>
            <SettingsListItem icon={<Public />} label="Curso Público" action={<Switch defaultChecked color="primary" />} />
            <SettingsListItem icon={<MonetizationOn />} label="Monetização" action={<Switch color="primary" />} />
          </List>

          <Box sx={{ mt: 4, px: 1 }}>
            <SectionTitle>Zona de Perigo</SectionTitle>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              sx={{
                p: '12px',
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'rgba(255, 82, 82, 0.5)',
                color: 'rgba(255, 82, 82, 0.9)',
                '&:hover': {
                  borderColor: 'rgba(255, 82, 82, 0.8)',
                  bgcolor: 'rgba(255, 82, 82, 0.1)',
                },
              }}
            >
              Excluir Curso Permanentemente
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
