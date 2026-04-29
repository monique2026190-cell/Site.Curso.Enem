import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

interface CardDescricaoProps {
  titulo: string;
  descricao: string;
}

const CardDescricao: React.FC<CardDescricaoProps> = ({ titulo, descricao }) => {
  return (
    <Card sx={{ m: 2, bgcolor: 'background.paper', color: 'white' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{color: 'lightgray'}}>
          {descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDescricao;
