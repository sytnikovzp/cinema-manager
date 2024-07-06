import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import StudiosItem from './StudiosItem';
import StudiosList from './StudiosList';

function Studios() {
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
          <Route path='edit' element={<Navigate to='/studios/edit/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Studios;
