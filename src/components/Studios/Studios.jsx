import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { getAllStudios } from '../../store/slices/studiosSlice';
// =============================================
import StudiosItem from './StudiosItem';
import StudiosList from './StudiosList';

function Studios() {
  const dispatch = useDispatch();

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
          <Route path='/' element={<StudiosList />} />
          <Route path=':id' element={<StudiosItem />} />
          <Route path='new' element={<Navigate to='/studios/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Studios;
