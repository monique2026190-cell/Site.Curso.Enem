import React from 'react';
import {
  Typography,
  Box,
} from '@mui/material';

interface CardCabecalhoProps {
  texto: string;
}

const CardCabecalho: React.FC<CardCabecalhoProps> = ({ texto }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        {texto}
      </Typography>
    </Box>
  );
};

export default CardCabecalho;
