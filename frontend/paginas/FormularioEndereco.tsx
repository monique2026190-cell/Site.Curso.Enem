import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface FormularioEnderecoProps {
  onSubmit: (data: { cidade: string }) => void;
}

const FormularioEndereco: React.FC<FormularioEnderecoProps> = ({ onSubmit }) => {
  const [cidade, setCidade] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ cidade });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
      <Typography component="h2" variant="h5" gutterBottom>
        Onde você mora?
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="cidade"
        label="Cidade"
        name="cidade"
        autoComplete="address-level2"
        autoFocus
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Finalizar
      </Button>
    </Box>
  );
};

export default FormularioEndereco;
