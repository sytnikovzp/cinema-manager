import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

import {
  stylesLogoBoxDesktop,
  stylesLogoBoxMobile,
  stylesLogoTypographyDesktop,
  stylesLogoTypographyMobile,
} from '../../styles';

function Logo({ isMobile }) {
  return (
    <Box
      component={RouterLink}
      sx={isMobile ? stylesLogoBoxMobile : stylesLogoBoxDesktop}
      to='/'
    >
      {!isMobile && <LocalMoviesIcon fontSize='large' />}
      <Typography
        noWrap
        sx={isMobile ? stylesLogoTypographyMobile : stylesLogoTypographyDesktop}
        variant='h6'
      >
        Cinema Manager
      </Typography>
    </Box>
  );
}

export default Logo;
