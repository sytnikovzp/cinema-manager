// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '@/src/services/styleService';

// import { getAllMovies } from '@/src/store/slices/moviesSlice';
// import { getAllActors } from '@/src/store/slices/actorsSlice';
// import { getAllDirectors } from '@/src/store/slices/directorsSlice';
// import { getAllStudios } from '@/src/store/slices/studiosSlice';
import MoviesItem from '@/src/components/Movies/MoviesItem';
import MoviesList from '@/src/components/Movies/MoviesList';

function Movies() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllMovies());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllActors());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllDirectors());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllStudios());
  // }, [dispatch]);

  const location = useLocation();
  const applyPaperStyles =
    !location.pathname.includes('/edit') && !location.pathname.includes('/new');

  return (
    <Box sx={styleEntityBox}>
      <Paper
        elevation={3}
        sx={applyPaperStyles ? rootComponentPaperStyle : null}
      >
        <Routes>
          <Route element={<MoviesList />} path='/' />
          <Route element={<MoviesItem />} path=':uuid' />
          <Route element={<Navigate to={`/movies/new/:uuid`} />} path='new' />
          <Route element={<Navigate to={`/movies/edit/:uuid`} />} path='edit' />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Movies;
