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
  Email,
  Telegram,
  Store,
  Close,
} from '@mui/icons-material';

interface ModalRecebimentoProps {
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

const ModalRecebimento: React.FC<ModalRecebimentoProps> = ({ open, onClose, onSelect }) => {
  const metodosRecebimento = [
    { nome: 'Receber no email', icone: <Email /> },
    { nome: 'Receber no telegram', icone: <Telegram /> },
    { nome: 'Receber pela kiwify', icone: <Store /> },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-recebimento-title"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-recebimento-title" variant="h6" component="h2">
            Como você prefere receber o acesso?
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {metodosRecebimento.map((metodo) => (
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

export default ModalRecebimento;
