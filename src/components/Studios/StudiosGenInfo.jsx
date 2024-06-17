import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import { textIndentStyle } from '../../services/styleService';
// =============================================
import { emptyStudio } from '../../constants';

function StudiosGenInfo() {
  const studios = useSelector((state) => state.studiosList.studios);

  const { id } = useParams();

  const studio = studios.find(
    (studio) => Number(studio.id) === Number(id)
  );

  const currentStudio = studio ? studio : emptyStudio;

  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {currentStudio.biography}
      </Typography>
    </Stack>
  );
}

export default StudiosGenInfo;
