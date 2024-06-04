import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
// =============================================
import { getAllMovies, addNewMovie } from '../../store/slices/moviesSlice';
// =============================================
import MoviesItem from './MoviesItem';
import MoviesList from './MoviesList';

function Movies() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.moviesList.movies);
  const currentMovie = useSelector((state) => state.moviesList.currentMovie);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const onNewMovie = () => {
    dispatch(addNewMovie());
  };

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: '10px',
        }}
      >
        <Stack direction='row' justifyContent='right'>
          <Button
            component={Link}
            to='new'
            id='new-btn'
            type='button'
            variant='contained'
            color='success'
            style={buttonMainStyle}
            startIcon={<GroupAddIcon />}
            onClick={onNewMovie}
          >
            Add movie
          </Button>
        </Stack>

        <Routes>
          <Route path=':id' element={<MoviesItem id={currentMovie.id} />} />
          <Route
            path='/'
            element={<MoviesList movies={movies} currentMovie={currentMovie} />}
          />
          <Route path='new' element={<Navigate to='/movies/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Movies;
