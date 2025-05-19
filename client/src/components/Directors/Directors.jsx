// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '../../services/styleService';

// import { getAllDirectors } from '../../store/slices/directorsSlice';
import DirectorsItem from './DirectorsItem';
import DirectorsList from './DirectorsList';

function Directors() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllDirectors());
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
          <Route element={<DirectorsList />} path='/' />
          <Route element={<DirectorsItem />} path=':uuid' />
          <Route
            element={<Navigate to={`/directors/new/:uuid`} />}
            path='new'
          />
          <Route
            element={<Navigate to={`/directors/edit/:uuid`} />}
            path='edit'
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Directors;
