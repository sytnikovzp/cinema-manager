// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// import { getAllStudios } from '@/src/store/slices/studiosSlice';
import StudiosItem from '@/src/components/Studios/StudiosItem';
import StudiosList from '@/src/components/Studios/StudiosList';

import { rootComponentPaperStyle, styleEntityBox } from '@/src/styles';

function Studios() {
  // const dispatch = useDispatch();

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
          <Route element={<StudiosList />} path='/' />
          <Route element={<StudiosItem />} path=':uuid' />
          <Route element={<Navigate to={`/studios/new/:uuid`} />} path='new' />
          <Route
            element={<Navigate to={`/studios/edit/:uuid`} />}
            path='edit'
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Studios;
