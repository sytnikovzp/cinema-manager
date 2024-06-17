import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import { textIndentStyle } from '../../services/styleService';
// =============================================
import { emptyActor } from '../../constants';

function ActorsBiography() {
  const actors = useSelector((state) => state.actorsList.actors);

  const { id } = useParams();

  const actor = actors.find((actor) => Number(actor.id) === Number(id));

  const currentActor = actor ? actor : emptyActor;

  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {currentActor.biography}
      </Typography>
    </Stack>
  );
}

export default ActorsBiography;
