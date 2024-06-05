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
import { getAllMovies, createMovie } from '../../store/slices/moviesSlice';
// =============================================
import MoviesItem from './MoviesItem';
import MoviesList from './MoviesList';

function Movies() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.moviesList.movies);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const onCreateMovie = () => {
    dispatch(createMovie());
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
            type='button'
            variant='contained'
            color='success'
            sx={buttonMainStyle}
            startIcon={<GroupAddIcon />}
            onClick={onCreateMovie}
          >
            Add movie
          </Button>
        </Stack>

        <Routes>
          <Route path='/' element={<MoviesList movies={movies} />} />
          <Route path=':id' element={<MoviesItem />} />
          <Route path='new' element={<Navigate to='/movies/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Movies;
