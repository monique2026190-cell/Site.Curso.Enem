import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BotaoCriarProposta: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="primary" size="large" onClick={() => navigate(`/criar-proposta`)}>
      Criar Proposta
    </Button>
  );
};

export default BotaoCriarProposta;
