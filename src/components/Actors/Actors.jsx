import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { getAllActors } from '../../store/slices/actorsSlice';
import { getAllMovies } from '../../store/slices/moviesSlice';
// =============================================
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper elevation={3} sx={rootComponentPaperStyle}>
        <Routes>
          <Route path='/' element={<ActorsList />} />
          <Route path=':id' element={<ActorsItem />} />
          <Route path='new' element={<Navigate to='/actors/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
