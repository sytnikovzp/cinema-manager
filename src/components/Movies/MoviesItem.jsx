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
import { emptyMovie } from '../../constants';

function MoviesItem() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const movies = useSelector((state) => state.moviesList.movies);

  const { movieId } = useParams();

  const movie = movies.find((movie) => Number(movie.id) === Number(movieId));

  const currentMovie = movie ? movie : emptyMovie;

  const formattedDirectors = currentMovie.directors.join(', ');
  const formattedActors = currentMovie.actors.join(', ');
  const formattedStudios = currentMovie.studios.join(', ');

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
                image={currentMovie.poster}
                alt={currentMovie.title}
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
              Title: {currentMovie.title}
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
