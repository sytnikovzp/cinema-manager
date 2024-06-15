import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
// =============================================
import { Box } from '@mui/material';
// =============================================
import { emptyMovie } from '../../constants';
// =============================================
import { playerStyle } from '../../services/styleService';

function MoviesPlayer() {
  const movies = useSelector((state) => state.moviesList.movies);

  const { id } = useParams();

  const movie = movies.find((movie) => Number(movie.id) === Number(id));

  const currentMovie = movie ? movie : emptyMovie;

  return (
    <Box sx={playerStyle}>
      <ReactPlayer url={currentMovie.trailer} light playing width='100%' />
    </Box>
  );
}

export default MoviesPlayer;
