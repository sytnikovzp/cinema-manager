import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
      <Paper
        elevation={3}
        sx={{
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: '10px',
        }}
      >
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
