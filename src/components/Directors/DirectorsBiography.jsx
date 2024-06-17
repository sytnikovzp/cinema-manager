import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import { textIndentStyle } from '../../services/styleService';
// =============================================
import { emptyDirector } from '../../constants';

function DirectorsBiography() {
  const directors = useSelector((state) => state.directorsList.directors);

  const { id } = useParams();

  const director = directors.find(
    (director) => Number(director.id) === Number(id)
  );

  const currentDirector = director ? director : emptyDirector;

  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {currentDirector.biography}
      </Typography>
    </Stack>
  );
}

export default DirectorsBiography;
