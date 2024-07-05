import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// =============================================
import Carousel from 'react-material-ui-carousel';
// =============================================
import Box from '@mui/material/Box';
// =============================================
import { carouselStyles } from '../../services/styleService';
// =============================================
import { getAllMovies } from '../../store/slices/moviesSlice';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const movies = useSelector((state) => state.moviesList.movies);

  const lastSevenMovies = movies.slice(-15).reverse();

  return (
    <>
      <Carousel stopAutoPlayOnHover>
        {lastSevenMovies.map((movie) => {
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
    </>
  );
}

export default HomePage;
