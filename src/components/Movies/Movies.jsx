// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { MOVIES_ENTITY_NAME } from '../../constants';
// =============================================
// import { getAllMovies } from '../../store/slices/moviesSlice';
// import { getAllActors } from '../../store/slices/actorsSlice';
// import { getAllDirectors } from '../../store/slices/directorsSlice';
// import { getAllStudios } from '../../store/slices/studiosSlice';
// =============================================
import MoviesItem from './MoviesItem';
import MoviesList from './MoviesList';

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
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={applyPaperStyles ? rootComponentPaperStyle : undefined}
      >
        <Routes>
          <Route path='/' element={<MoviesList />} />
          <Route path=':id' element={<MoviesItem />} />
          <Route
            path='new'
            element={<Navigate to={`/${MOVIES_ENTITY_NAME}/new/:id`} />}
          />
          <Route
            path='edit'
            element={<Navigate to={`/${MOVIES_ENTITY_NAME}/edit/:id`} />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Movies;
