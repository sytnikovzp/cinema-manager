import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// =============================================
import Carousel from 'react-material-ui-carousel';
// =============================================
import Box from '@mui/material/Box';
// =============================================
import { carouselStyles } from '../../services/styleService';
// =============================================
import { renderHomePageSkeleton } from '../../services/skeletonService';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import { MOVIES_ENTITY_NAME } from '../../constants';
// =============================================
import usePaginatedData from '../../hooks/usePaginatedData';

const ITEMS_PER_PAGE = 15;

function HomePage() {
  const {
    data: movies,
    loading,
    error,
  } = usePaginatedData(`/${MOVIES_ENTITY_NAME}`, ITEMS_PER_PAGE, 1);

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
        renderHomePageSkeleton()
      ) : (
        <Carousel stopAutoPlayOnHover>
          {lastMovies.map((movie) => (
            <Box key={movie.id} style={carouselStyles.imgContainerStyle}>
              <Link to={`/${MOVIES_ENTITY_NAME}/${movie.id}`}>
                <img
                  src={movie.poster}
                  alt={movie.title}
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
