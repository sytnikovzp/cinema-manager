import PropTypes from 'prop-types';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import { textIndentStyle } from '../../services/styleService';

function StudiosBiography({ about }) {
  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {about}
      </Typography>
    </Stack>
  );
}

StudiosBiography.propTypes = {
  about: PropTypes.string.isRequired,
};

export default StudiosBiography;
