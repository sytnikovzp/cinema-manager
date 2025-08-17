// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '@/src/services/styleService';

// import { getAllActors } from '@/src/store/slices/actorsSlice';
import ActorsItem from '@/src/components/Actors/ActorsItem';
import ActorsList from '@/src/components/Actors/ActorsList';

function Actors() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllActors());
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
          <Route element={<ActorsList />} path='/' />
          <Route element={<ActorsItem />} path=':uuid' />
          <Route element={<Navigate to={`/actors/new/:uuid`} />} path='new' />
          <Route element={<Navigate to={`/actors/edit/:uuid`} />} path='edit' />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
