import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

interface CardInformacaoPerfilProps {
  nome: string;
  avatarUrl?: string;
}

const CardInformacaoPerfil: React.FC<CardInformacaoPerfilProps> = ({ nome, avatarUrl }) => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatarUrl} sx={{ width: 80, height: 80, mr: 2 }} />
          <Typography variant="h5">{nome}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardInformacaoPerfil;
