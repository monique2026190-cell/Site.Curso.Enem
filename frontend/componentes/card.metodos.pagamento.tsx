import React from 'react';
import { Card, CardContent, Typography, Button, Modal, Box, List, ListItem, ListItemText } from '@mui/material';

interface CardMetodosPagamentoProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CardMetodosPagamento: React.FC<CardMetodosPagamentoProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Métodos de Pagamento
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Cartão de Crédito" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Boleto Bancário" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="PIX" />
          </ListItem>
        </List>
        <Button onClick={onClose} sx={{ mt: 2 }}>Fechar</Button>
      </Box>
    </Modal>
  );
};

export default CardMetodosPagamento;
