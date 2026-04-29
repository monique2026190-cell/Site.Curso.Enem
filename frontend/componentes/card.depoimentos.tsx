import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
} from '@mui/material';

interface CardDepoimentoProps {
  nome: string;
  depoimento: string;
  avatarUrl: string;
  rating: number;
}

const CardDepoimento: React.FC<CardDepoimentoProps> = ({ nome, depoimento, avatarUrl, rating }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, bgcolor: 'background.paper', color: 'white' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatarUrl} alt={nome} sx={{ mr: 2 }} />
          <Typography variant="h6">{nome}</Typography>
        </Box>
        <Rating value={rating} readOnly />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, color: 'lightgray' }}>
          "{depoimento}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDepoimento;
