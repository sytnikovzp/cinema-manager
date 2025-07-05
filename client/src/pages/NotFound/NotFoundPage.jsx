import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ERROR_MESSAGES } from '../../constants';

import {
  stylesErrorPageBox,
  stylesErrorPageButton,
  stylesErrorPageTypography,
} from '../../styles';

function NotFoundPage() {
  const navigate = useNavigate();

  const randomMessage =
    ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];

  const handleNavigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box sx={stylesErrorPageBox}>
      <Typography color='#FF5252' fontWeight={700} variant='h2'>
        Error 404
      </Typography>

      <Typography
        color='#2E7D32'
        fontWeight={500}
        sx={stylesErrorPageTypography}
        variant='h4'
      >
        {randomMessage}
      </Typography>

      <Button
        color='success'
        sx={stylesErrorPageButton}
        variant='contained'
        onClick={handleNavigateToHome}
      >
        Return to home page
      </Button>
    </Box>
  );
}

export default NotFoundPage;
