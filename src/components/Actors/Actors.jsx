// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { ACTORS_ENTITY_NAME } from '../../constants';
// =============================================
// import { getAllActors } from '../../store/slices/actorsSlice';
// =============================================
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllActors());
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
          <Route path='/' element={<ActorsList />} />
          <Route path=':id' element={<ActorsItem />} />
          <Route
            path='new'
            element={<Navigate to={`/${ACTORS_ENTITY_NAME}/new/:id`} />}
          />
          <Route
            path='edit'
            element={<Navigate to={`/${ACTORS_ENTITY_NAME}/edit/:id`} />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
