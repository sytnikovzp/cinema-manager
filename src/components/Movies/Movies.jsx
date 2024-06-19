import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { getAllMovies } from '../../store/slices/moviesSlice';
import { getAllActors } from '../../store/slices/actorsSlice';
import { getAllDirectors } from '../../store/slices/directorsSlice';
import { getAllStudios } from '../../store/slices/studiosSlice';
// =============================================
import MoviesItem from './MoviesItem';
import MoviesList from './MoviesList';

function Movies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper elevation={3} sx={rootComponentPaperStyle}>
        <Routes>
          <Route path='/' element={<MoviesList />} />
          <Route path=':id' element={<MoviesItem />} />
          <Route path='new' element={<Navigate to='/movies/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Movies;
