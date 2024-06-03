import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { buttonStyle } from '../../services/styleService';
import { getActorById } from '../../store/slices/actorsSlice';

function ActorsItem() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const actors = useSelector((state) => state.actorsList.actors);

  const { fullName, birthYear, nationality, image, movies } = actors.find(
    (actor) => actor.id === Number(id)
  );

  const formattedMovies = movies.join(', ');

  useEffect(() => {
    dispatch(getActorById(id));
  }, [dispatch, id]);

  return (
    <>
      <Stack direction='row' justifyContent='left'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          style={buttonStyle}
          sx={{ marginTop: -8, textAlign: 'left' }}
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
                image={image}
                alt={fullName}
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
              FullName: {fullName}
            </Typography>
            <Typography variant='body1' component='div'>
              Birth Year: {birthYear}
            </Typography>
            <Typography variant='body1' component='div'>
              Nationality: {nationality}
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
