import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CursoCardProps {
  id: number;
  nome: string;
  descricao: string;
}

const CursoCard: React.FC<CursoCardProps> = ({ id, nome, descricao }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', bgcolor: 'background.paper' }} onClick={() => navigate(`/curso/${id}`)}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography>
            {descricao}
          </Typography>
        </CardContent>
        <Button size="small" sx={{ m: 1 }}>
          Inscreva-se
        </Button>
      </Card>
    </Grid>
  );
};

export default CursoCard;
