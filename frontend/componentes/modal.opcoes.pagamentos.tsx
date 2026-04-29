import React from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  QrCode,
  Description,
  Close,
} from '@mui/icons-material';

interface ModalOpcoesPagamentoProps {
  open: boolean;
  onClose: () => void;
  onSelect: (metodo: string) => void;
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
  color: 'white',
};

const ModalOpcoesPagamento: React.FC<ModalOpcoesPagamentoProps> = ({ open, onClose, onSelect }) => {
  const metodosPagamento = [
    { nome: 'PIX', icone: <QrCode /> },
    { nome: 'Cartão de Crédito', icone: <CreditCard /> },
    { nome: 'Cartão de Débito', icone: <AccountBalance /> },
    { nome: 'Boleto', icone: <Description /> },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-opcoes-pagamento-title"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-opcoes-pagamento-title" variant="h6" component="h2">
            Escolha a forma de pagamento
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {metodosPagamento.map((metodo) => (
            <ListItem key={metodo.nome} disablePadding>
              <ListItemButton onClick={() => onSelect(metodo.nome)} sx={{ color: 'white' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {metodo.icone}
                </ListItemIcon>
                <ListItemText primary={metodo.nome} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default ModalOpcoesPagamento;
