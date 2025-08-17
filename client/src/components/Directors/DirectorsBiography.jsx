import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styleStackMargin, textIndentStyle } from '@/src/services/styleService';

function DirectorsBiography({ biography }) {
  return (
    <Stack direction='row' spacing={1} sx={styleStackMargin}>
      <Typography component='div' sx={textIndentStyle} variant='body1'>
        {biography}
      </Typography>
    </Stack>
  );
}

export default DirectorsBiography;
