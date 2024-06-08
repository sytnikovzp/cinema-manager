import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
import { emptyActor } from '../../constants';

function ActorsItem() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/actors');
  };

  const actors = useSelector((state) => state.actorsList.actors);

  const { actorId } = useParams();

  const actor = actors.find((actor) => Number(actor.id) === Number(actorId));

  const currentActor = actor ? actor : emptyActor;

  const formattedMovies = currentActor.movies.join(', ');

  return (
    <>
      <Stack direction='row' justifyContent='left'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          style={buttonMainStyle}
          sx={{ textAlign: 'left' }}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
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
