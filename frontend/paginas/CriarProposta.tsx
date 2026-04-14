import React from 'react';
import { Container, Typography, TextField, Button, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const CriarProposta: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Criar Proposta de Curso
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Título da Proposta"
            name="titulo"
            autoFocus
            variant="outlined"
            InputLabelProps={{
              style: { color: '#E0E0E0' },
            }}
            sx={{ input: { color: 'white' }, '.MuiOutlinedInput-root': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="descricao"
            label="Descrição da Proposta"
            name="descricao"
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{
              style: { color: '#E0E0E0' },
            }}
            sx={{ textarea: { color: 'white' }, '.MuiOutlinedInput-root': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar Proposta
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CriarProposta;
