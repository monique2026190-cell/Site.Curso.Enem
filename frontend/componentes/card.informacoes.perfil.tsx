import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

interface CardInformacaoPerfilProps {
  nome: string;
  avatarUrl?: string;
}

const CardInformacaoPerfil: React.FC<CardInformacaoPerfilProps> = ({ nome, avatarUrl }) => {
  return (
    <Card sx={{ 
        mb: 4,
        borderRadius: '16px', // Bordas mais arredondadas
        bgcolor: '#2C2C2C', // Fundo escuro para um look sofisticado
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)', // Sombra mais pronunciada
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3 // Padding interno
    }}>
      <Avatar 
        src={avatarUrl} 
        sx={{ 
            width: 120, // Tamanho maior do avatar
            height: 120, 
            mb: 2, // Margem inferior
            border: '4px solid #FFC107', // Borda amarela para destaque
        }} 
      />
      <CardContent>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{nome}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardInformacaoPerfil;
