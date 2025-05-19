import { useContext, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

import usePagination from '../../hooks/usePagination';

import { carouselStyles } from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import HomePageSkeleton from '../SkeletonLoader/HomePageSkeleton';

const ITEMS_PER_PAGE = 15;

function HomePage() {
  const {
    data: movies,
    loading,
    error,
  } = usePagination(`/movies`, ITEMS_PER_PAGE, 1);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const filteredMovies = movies.filter((movie) => movie.poster);
  const lastMovies = filteredMovies.slice(0, ITEMS_PER_PAGE);

  return (
    <>
      {loading ? (
        <HomePageSkeleton />
      ) : (
        <Carousel stopAutoPlayOnHover>
          {lastMovies.map((movie) => (
            <Box key={movie.uuid} style={carouselStyles.imgContainerStyle}>
              <Link to={`/movies/${movie.uuid}`}>
                <img
                  alt={movie.title}
                  src={movie.poster}
                  style={carouselStyles.imgStyle}
                />
              </Link>
            </Box>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default HomePage;
