import React, { useState, useRef } from 'react';
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Image as ImageIcon,
  Videocam as VideocamIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#5E97F6',
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
    return <ImageIcon />;
  }
  if (['mp4', 'mov', 'avi'].includes(extension!)) {
    return <VideocamIcon />;
  }
  return <FileIcon />;
};

const Aula: React.FC = () => {
  const navigate = useNavigate();
  const { id: courseId, aulaId } = useParams<{ id: string, aulaId: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileIndex: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== fileIndex));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="voltar" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
              Aula {aulaId}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Adicionar Conteúdo</Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Adicione arquivos, vídeos e imagens para esta aula.
          </Typography>

          <Paper sx={{ p: 2, mb: 4, bgcolor: '#1E1E1E' }}>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*,video/*"
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleButtonClick}
              fullWidth
              sx={{ p: 2, textTransform: 'none', fontSize: '1rem' }}
            >
              Adicionar Arquivos, Fotos ou Vídeos
            </Button>
            <List sx={{ mt: 2 }}>
              {files.map((file, index) => (
                <React.Fragment key={index}>
                    <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)}>
                        <DeleteIcon />
                        </IconButton>
                    }
                    >
                    <ListItemIcon>
                        {getFileIcon(file.name)}
                    </ListItemIcon>
                    <ListItemText
                        primary={file.name}
                        secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    />
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>

        </Container>
        
        <Box sx={{ p: 2, bgcolor: 'background.paper', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ textTransform: 'none', fontSize: '1.1rem' }}
              disabled={files.length === 0}
            >
              Publicar Conteúdo
            </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Aula;
