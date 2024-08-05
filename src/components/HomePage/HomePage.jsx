import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// =============================================
import Carousel from 'react-material-ui-carousel';
// =============================================
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// =============================================
import { carouselStyles, skeletonStyles } from '../../services/styleService';
// =============================================
import { MOVIES_SLICE_NAME } from '../../constants';
// =============================================
import useSnackbar from '../../hooks/useSnackbar';
import usePaginatedData from '../../hooks/usePaginatedData';

const ITEMS_PER_PAGE = 15;

function HomePage() {
  const { snackbar, showSnackbar, handleClose } = useSnackbar();
  const {
    data: movies,
    loading,
    error,
  } = usePaginatedData(`/${MOVIES_SLICE_NAME}`, ITEMS_PER_PAGE, 1);

  useEffect(() => {
    if (error && snackbar.message !== error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar, snackbar.message]);

  const filteredMovies = movies.filter((movie) => movie.poster);
  const lastMovies = filteredMovies.slice(0, ITEMS_PER_PAGE);

  return (
    <>
      {loading ? (
        <Box>
          <Skeleton
            variant='rectangular'
            animation='wave'
            sx={skeletonStyles}
          />
        </Box>
      ) : (
        <Carousel stopAutoPlayOnHover>
          {lastMovies.map((movie) => (
            <Box key={movie.id} style={carouselStyles.imgContainerStyle}>
              <Link to={`/${MOVIES_SLICE_NAME}/${movie.id}`}>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HomePage;
