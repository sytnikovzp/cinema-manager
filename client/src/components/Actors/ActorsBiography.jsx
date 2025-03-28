import PropTypes from 'prop-types';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import { textIndentStyle } from '../../services/styleService';

function ActorsBiography({ biography }) {
  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {biography}
      </Typography>
    </Stack>
  );
}

ActorsBiography.propTypes = {
  biography: PropTypes.string.isRequired,
};

export default ActorsBiography;
