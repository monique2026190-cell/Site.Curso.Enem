import React from 'react';
import { Button } from '@mui/material';

interface BotaoAvancarEtapaProps {
  onClick: () => void;
  // Você pode adicionar outras props se necessário, como 'disabled', etc.
}

const BotaoAvancarEtapa: React.FC<BotaoAvancarEtapaProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ mt: 3, mb: 2, py: 1.5 }}
    >
      Avançar Etapa
    </Button>
  );
};

export default BotaoAvancarEtapa;
