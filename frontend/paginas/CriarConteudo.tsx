import React from 'react';
import { Container, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CriarConteudo: React.FC = () => {
  const [tipoConteudo, setTipoConteudo] = React.useState('');

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
        Criar Novo Conteúdo
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-conteudo-label">Tipo de Conteúdo</InputLabel>
          <Select
            labelId="tipo-conteudo-label"
            id="tipo-conteudo"
            value={tipoConteudo}
            label="Tipo de Conteúdo"
            onChange={(e) => setTipoConteudo(e.target.value)}
          >
            <MenuItem value="aula">Aula</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
            <MenuItem value="material">Material de Apoio</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="titulo-conteudo"
          label="Título do Conteúdo"
          name="titulo-conteudo"
        />
        <TextField
          margin="normal"
          fullWidth
          id="descricao-conteudo"
          label="Descrição"
          name="descricao-conteudo"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            Criar Conteúdo
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CriarConteudo;
