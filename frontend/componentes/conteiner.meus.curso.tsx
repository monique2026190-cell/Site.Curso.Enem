import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MeusCursosCardProps {
  id: number;
  nome: string;
  progresso: number;
}

const MeusCursosCard: React.FC<MeusCursosCardProps> = ({ id, nome, progresso }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/conteudo-curso/${id}`);
  };

  return (
    <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={handleCardClick}>
      <CardContent>
        <Typography variant="h6">{nome}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progresso} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              progresso,
            )}%`}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MeusCursosCard;
