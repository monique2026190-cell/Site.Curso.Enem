import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { School, Comment, ThumbUp } from '@mui/icons-material';

interface NotificacaoCardProps {
  tipo: 'novo_curso' | 'novo_comentario' | 'curtida';
  mensagem: string;
  data: string;
}

const getIcon = (tipo: NotificacaoCardProps['tipo']) => {
  switch (tipo) {
    case 'novo_curso':
      return <School />;
    case 'novo_comentario':
      return <Comment />;
    case 'curtida':
      return <ThumbUp />;
    default:
      return null;
  }
}

const NotificacaoCard: React.FC<NotificacaoCardProps> = ({ tipo, mensagem, data }) => {

  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
        {getIcon(tipo)}
      </Avatar>
      <Box>
        <Typography variant="body1">{mensagem}</Typography>
        <Typography variant="caption" color="text.secondary">{data}</Typography>
      </Box>
    </Card>
  );
};

export default NotificacaoCard;
