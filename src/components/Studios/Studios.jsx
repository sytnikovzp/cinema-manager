// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { STUDIOS_ENTITY_NAME } from '../../constants';
// =============================================
// import { getAllStudios } from '../../store/slices/studiosSlice';
// =============================================
import StudiosItem from './StudiosItem';
import StudiosList from './StudiosList';

function Studios() {
  // const dispatch = useDispatch();

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
          <Route path='/' element={<StudiosList />} />
          <Route path=':id' element={<StudiosItem />} />
          <Route
            path='new'
            element={<Navigate to={`/${STUDIOS_ENTITY_NAME}/new/:id`} />}
          />
          <Route
            path='edit'
            element={<Navigate to={`/${STUDIOS_ENTITY_NAME}/edit/:id`} />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Studios;
