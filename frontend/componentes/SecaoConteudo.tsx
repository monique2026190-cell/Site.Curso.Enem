import React, { useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';

type Pasta = {
  id: number;
  titulo: string;
};

type Secao = {
  id: number;
  titulo: string;
  pastas: Pasta[];
};

interface SecaoConteudoProps {
  secoes: Secao[];
}

const SecaoConteudo: React.FC<SecaoConteudoProps> = ({ secoes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<{ type: 'secao' | 'pasta'; id: number } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleClick = (event: React.MouseEvent<HTMLElement>, type: 'secao' | 'pasta', id: number) => {
    event.stopPropagation(); // Impede que o clique na pasta propague para o ícone
    setAnchorEl(event.currentTarget);
    setSelectedItem({ type, id });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handlePastaClick = (pastaId: number) => {
    navigate(`/curso/${id}/aula/${pastaId}`);
  };

  return (
    <>
      {secoes.map(secao => (
        <Box key={secao.id} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>{secao.titulo}</Typography>
            <IconButton onClick={(e) => handleClick(e, 'secao', secao.id)} sx={{ color: 'white' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          {secao.pastas.map(pasta => (
            <Box 
              key={pasta.id} 
              onClick={() => handlePastaClick(pasta.id)}
              sx={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                bgcolor: '#2C2C2C', 
                color: 'text.primary', 
                mb: 1, 
                p: '12px 16px', 
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#3C3C3C',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FolderIcon sx={{ mr: 1, color: '#FFC107' }} />
                <Typography>{pasta.titulo}</Typography>
              </Box>
              <IconButton onClick={(e) => handleClick(e, 'pasta', pasta.id)} sx={{ color: 'white' }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Editar</MenuItem>
        <MenuItem onClick={handleClose}>Excluir</MenuItem>
      </Menu>
    </>
  );
};

export default SecaoConteudo;
