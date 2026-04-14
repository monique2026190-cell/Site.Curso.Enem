import React from 'react';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

interface BotaoConfiguracoesProps {
  id: string;
}

const BotaoConfiguracoesCurso: React.FC<BotaoConfiguracoesProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Button variant="outlined" startIcon={<SettingsIcon />} onClick={() => navigate(`/curso/${id}/configuracoes`)}>
      Configurações
    </Button>
  );
};

export default BotaoConfiguracoesCurso;
