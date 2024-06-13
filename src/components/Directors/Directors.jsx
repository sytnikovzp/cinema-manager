import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import DirectorsItem from './DirectorsItem';
import DirectorsList from './DirectorsList';

function Directors() {
  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper elevation={3} sx={rootComponentPaperStyle}>
        <Routes>
          <Route path='/' element={<DirectorsList />} />
          <Route path=':id' element={<DirectorsItem />} />
          <Route path='new' element={<Navigate to='/directors/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Directors;
