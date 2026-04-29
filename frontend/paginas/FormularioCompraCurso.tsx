import React from 'react';
import {
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';

interface FormularioCompraCursoProps {
  onSelect: (desejaComprar: boolean) => void;
}

const FormularioCompraCurso: React.FC<FormularioCompraCursoProps> = ({ onSelect }) => {
  return (
    <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
      <Typography component="h2" variant="h5" gutterBottom>
        Deseja comprar o curso?
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => onSelect(true)}
          sx={{ px: 5, py: 1.5 }}
        >
          Sim
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onSelect(false)}
          sx={{ px: 5, py: 1.5 }}
        >
          Não
        </Button>
      </Stack>
    </Box>
  );
};

export default FormularioCompraCurso;
