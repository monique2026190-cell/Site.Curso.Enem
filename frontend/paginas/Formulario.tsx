import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import BotaoAvancarEtapa from '../componentes/Botao.avancar.etapa';
import FormularioEndereco from './FormularioEndereco';
import FormularioCompraCurso from './FormularioCompraCurso';
import PaginaVendasEnem from './PaginaVendasEnem';

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

const Formulario = () => {
  const [etapa, setEtapa] = useState(1);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [mostrarPaginaVendas, setMostrarPaginaVendas] = useState(false);

  const handleAvancarParaEndereco = () => {
    if (nome && idade) {
      setEtapa(2);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleEnderecoSubmit = (enderecoData: { cidade: string }) => {
    setCidade(enderecoData.cidade);
    setEtapa(3);
  };

  const handleCompraCursoSelect = (desejaComprar: boolean) => {
    if (desejaComprar) {
      setMostrarPaginaVendas(true);
    } else {
      alert(
        `Cadastro Finalizado!\nNome: ${nome}\nIdade: ${idade}\nCidade: ${cidade}\nDeseja comprar o curso?: Não`
      );
      // Aqui você pode resetar o estado ou redirecionar o usuário
    }
  };

  const renderEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <Typography component="h1" variant="h4" gutterBottom>
              Etapa 1: Dados Pessoais
            </Typography>
            <Box sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="name"
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="idade"
                label="Idade"
                type="number"
                id="idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                variant="outlined"
              />
              <BotaoAvancarEtapa onClick={handleAvancarParaEndereco} />
            </Box>
          </>
        );
      case 2:
        return <FormularioEndereco onSubmit={handleEnderecoSubmit} />;
      case 3:
        return <FormularioCompraCurso onSelect={handleCompraCursoSelect} />;
      default:
        return <Typography>Etapa não encontrada.</Typography>;
    }
  };

  if (mostrarPaginaVendas) {
    return <PaginaVendasEnem />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 10px 30px -5px rgba(0,0,0,0.3)',
          }}
        >
          {renderEtapa()}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Formulario;
