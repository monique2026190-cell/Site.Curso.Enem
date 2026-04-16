
import React from 'react';
import {
  CssBaseline, GlobalStyles, ThemeProvider, createTheme, Box, AppBar, Toolbar, IconButton, Typography,
  Container, List, ListItem, ListItemIcon, ListItemText, Switch, Button, Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon, AccountCircle, Lock, Language, Notifications, CreditCard, Security, VpnKey,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
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

export const ConfiguracoesApp: React.FC = () => {
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
              Configurações
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
          <List>
            <SectionTitle>Conta</SectionTitle>
            <SettingsListItem icon={<AccountCircle />} label="Editar Perfil" />
            <SettingsListItem icon={<Lock />} label="Conta Privada" action={<Switch color="primary" />} />
            <SettingsListItem icon={<Language />} label="Idioma" />
            <SettingsListItem icon={<Notifications />} label="Notificações" />

            <SectionTitle>Financeiro</SectionTitle>
            <SettingsListItem icon={<CreditCard />} label="Pagamentos" />

            <SectionTitle>Segurança & Privacidade</SectionTitle>
            <SettingsListItem icon={<VpnKey />} label="Alterar Senha" />
            <SettingsListItem icon={<Security />} label="Privacidade" />
          </List>

          <Box sx={{ mt: 4, px: 1 }}>
            <Button
              fullWidth
              variant="text"
              startIcon={<ExitToAppIcon />}
              sx={{
                p: '12px',
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                color: 'text.secondary',
                bgcolor: 'background.paper',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#282828',
                  color: '#ff8a80', // Tom sutil de vermelho no hover
                },
              }}
            >
              Sair da Conta
            </Button>
            <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2, opacity: 0.5 }}>
              Flux Security Ecosystem • v1.2.3
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
