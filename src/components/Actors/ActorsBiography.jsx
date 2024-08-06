import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// =============================================
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import { textIndentStyle } from '../../services/styleService';
// =============================================
import { getActorById } from '../../services/actorService';
import { emptyActor } from '../../constants';

function ActorsBiography() {
  const { id } = useParams();

  const [actor, setActor] = useState(emptyActor);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchActor = useCallback(async () => {
    try {
      const data = await getActorById(id);
      setActor(data);
    } catch (error) {
      showSnackbar('Failed to fetch actor data!', 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setActor(emptyActor);
    } else {
      fetchActor();
    }
  }, [id, fetchActor]);

  return (
    <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
      <Typography variant='body1' component='div' sx={textIndentStyle}>
        {actor.biography || 'No biography available'}
      </Typography>
    </Stack>
  );
}

export default ActorsBiography;
