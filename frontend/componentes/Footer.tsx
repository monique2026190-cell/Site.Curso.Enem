import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Notifications, School, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0:
              navigate('/cursos');
              break;
            case 1:
              navigate('/meus-cursos');
              break;
            case 2:
              navigate('/notificacoes');
              break;
            case 3:
              navigate('/meu-perfil');
              break;
          }
        }}
      >
        <BottomNavigationAction label="Início" icon={<Home />} />
        <BottomNavigationAction label="Meus Cursos" icon={<School />} />
        <BottomNavigationAction label="Notificações" icon={<Notifications />} />
        <BottomNavigationAction label="Meu Perfil" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
