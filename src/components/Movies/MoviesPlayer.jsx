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
      <ReactPlayer
        url={currentMovie.trailer}
        light
        width='100%'
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              iv_load_policy: 3,
              rel: 0,
              showinfo: 0,
              modestbranding: 1,
              cc_load_policy: 1,
            },
            embedOptions: {
              host: 'https://www.youtube-nocookie.com',
            },
          },
        }}
      />
    </Box>
  );
}

export default MoviesPlayer;
