import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
import { emptyActor } from '../../constants';
import { useEffect } from 'react';
import { getAllActors, updateActor } from '../../store/slices/actorsSlice';

function ActorsItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/actors');
  };

  const actors = useSelector((state) => state.actorsList.actors);

  const { actorId } = useParams();

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  const actor = actors.find((actor) => Number(actor.id) === Number(actorId));

  const currentActor = actor ? actor : emptyActor;

  const formattedMovies = currentActor.movies
    ? currentActor.movies.join(', ')
    : 'No movies available';

  const onItemEdit = (event, actor) => {
    event.stopPropagation();
    dispatch(updateActor(actor));
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          sx={buttonMainStyle}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
        </Button>

        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          onClick={onItemEdit}
          component={Link}
          to={`/actors/new/${actor.id}`}
        >
          Edit
        </Button>
      </Stack>

      <Box
        sx={{
          minHeight: '57vh',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '40%',
            }}
          >
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={currentActor.image}
                alt={currentActor.fullName}
              />
            </Card>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
            }}
          >
            <Typography variant='h6' component='div'>
              FullName: {currentActor.fullName}
            </Typography>
            <Typography variant='body1' component='div'>
              Birth Year: {currentActor.birthYear}
            </Typography>
            <Typography variant='body1' component='div'>
              Nationality: {currentActor.nationality}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Movies: {formattedMovies}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ActorsItem;
