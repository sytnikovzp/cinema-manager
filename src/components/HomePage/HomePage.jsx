import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// =============================================
import Carousel from 'react-material-ui-carousel';
// =============================================
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
// =============================================
import { carouselStyles, skeletonStyles } from '../../services/styleService';

function HomePage() {
  const movies = useSelector((state) => state.moviesList.movies);
  const status = useSelector((state) => state.directorsList.status);

  const filteredMovies = movies.filter((movie) => movie.poster);

  const lastMovies = filteredMovies.slice(-15).reverse();

  return (
    <>
      {status === 'loading' ? (
        <Box>
          <Skeleton
            variant='rectangular'
            animation='wave'
            sx={skeletonStyles}
          />
        </Box>
      ) : (
        <Carousel stopAutoPlayOnHover>
          {lastMovies.map((movie) => {
            return (
              <Box key={movie.id} style={carouselStyles.imgContainerStyle}>
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={carouselStyles.imgStyle}
                  />
                </Link>
              </Box>
            );
          })}
        </Carousel>
      )}
    </>
  );
}

export default HomePage;
