import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styleStackMargin, textIndentStyle } from '../../services/styleService';

function StudiosBiography({ about }) {
  return (
    <Stack direction='row' spacing={1} sx={styleStackMargin}>
      <Typography component='div' sx={textIndentStyle} variant='body1'>
        {about}
      </Typography>
    </Stack>
  );
}

export default StudiosBiography;
