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
import { buttonMainStyle } from '../../services/styleService';
import { getMovieById } from '../../store/slices/moviesSlice';

function MoviesItem() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const movies = useSelector((state) => state.moviesList.movies);

  const { title, directors, actors, studios, poster } = movies.find(
    (movie) => movie.id === Number(id)
  );

  const formattedDirectors = directors.join(', ');
  const formattedActors = actors.join(', ');
  const formattedStudios = studios.join(', ');

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  return (
    <>
      <Stack direction='row' justifyContent='left'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          style={buttonMainStyle}
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
                image={poster}
                alt={title}
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
              Title: {title}
            </Typography>
            <Typography variant='body1' component='div'>
              Directors: {formattedDirectors}
            </Typography>
            <Typography variant='body1' component='div'>
              Actors: {formattedActors}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Studios: {formattedStudios}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MoviesItem;
