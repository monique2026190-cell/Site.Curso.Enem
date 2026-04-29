import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import ModalOpcoesPagamento from '../componentes/modal.opcoes.pagamentos';
import ModalRecebimento from '../componentes/modal.recebimento';
import CardDepoimento from '../componentes/card.depoimentos';
import CardDescricao from '../componentes/card.descricacao';
import CardCabecalho from '../componentes/card.cabeçalho';

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const depoimentos = [
  {
    nome: 'Maria Silva',
    depoimento: 'adorei, mn curso de altissimo nivel.',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
  },
  {
    nome: 'João Santos',
    depoimento: 'Didática incrível e professores muito atenciosos. Recomendo para todos que querem passar no ENEM.',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
  },
  {
    nome: 'Ana Oliveira',
    depoimento: 'Finalmente entendi matemática! O curso descomplica as matérias mais difíceis.',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    rating: 4,
  },
];

const descricoes = [
    {
        titulo: 'Videoaulas Completas',
        descricao: 'Acesse a uma vasta biblioteca de videoaulas, cobrindo todos os tópicos do ENEM. Nossos professores especializados garantem que você entenda cada detalhe, não importa o quão complexo seja.'
    },
    {
        titulo: 'Simulados e Exercícios',
        descricao: 'Teste seus conhecimentos com simulados que imitam o formato do ENEM e uma grande variedade de exercícios. Acompanhe seu progresso e identifique áreas que precisam de mais atenção.'
    },
    {
        titulo: 'Material de Apoio',
        descricao: 'Além das aulas, você terá acesso a resumos, apostilas e outros materiais de apoio para reforçar seu aprendizado e consultar sempre que precisar.'
    },
    {
        titulo: 'Suporte de Professores',
        descricao: 'Nossa equipe de professores está sempre à disposição para tirar suas dúvidas e oferecer o suporte necessário para que você alcance seus objetivos.'
    }
];


const PaginaVendasEnem = () => {
  const [recebimentoModalAberto, setRecebimentoModalAberto] = useState(false);
  const [pagamentoModalAberto, setPagamentoModalAberto] = useState(false);
  const [metodoRecebimento, setMetodoRecebimento] = useState('');

  const handleCompraClick = () => {
    setRecebimentoModalAberto(true);
  };

  const handleRecebimentoSelect = (metodo: string) => {
    setMetodoRecebimento(metodo);
    setRecebimentoModalAberto(false);
    setPagamentoModalAberto(true);
  };

  const handlePagamentoSelect = (metodoPagamento: string) => {
    setPagamentoModalAberto(false);
    alert(
      `Recebimento: ${metodoRecebimento}\nPagamento: ${metodoPagamento}. Redirecionando...`
    );
    // Lógica de redirecionamento para a página de pagamento específica
  };

  const handleFecharModalRecebimento = () => {
    setRecebimentoModalAberto(false);
  };

  const handleFecharModalPagamento = () => {
    setPagamentoModalAberto(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <CardCabecalho texto="Curso Preparatório para o ENEM" />
        <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://via.placeholder.com/1200x300.png?text=Curso+ENEM" // Placeholder image
              alt="Curso ENEM"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Domine o ENEM e conquiste a sua vaga na universidade!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nosso curso completo oferece tudo o que você precisa para se preparar para o Exame Nacional do Ensino Médio. Com videoaulas, materiais de apoio, simulados e uma equipe de professores experientes, você estará pronto para alcançar a sua nota máxima.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
              <Button size="large" variant="contained" color="primary" onClick={handleCompraClick}>
                Quero ser aprovado!
              </Button>
            </CardActions>
          </Card>
        
        <Box sx={{ my: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                O que você vai aprender
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {descricoes.map((descricao, index) => (
                    <CardDescricao key={index} {...descricao} />
                ))}
            </Box>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            O que nossos alunos dizem
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {depoimentos.map((depoimento, index) => (
              <CardDepoimento key={index} {...depoimento} />
            ))}
          </Box>
        </Box>

        <ModalRecebimento
          open={recebimentoModalAberto}
          onClose={handleFecharModalRecebimento}
          onSelect={handleRecebimentoSelect}
        />
        <ModalOpcoesPagamento
          open={pagamentoModalAberto}
          onClose={handleFecharModalPagamento}
          onSelect={handlePagamentoSelect}
        />
      </Container>
    </ThemeProvider>
  );
};

export default PaginaVendasEnem;
