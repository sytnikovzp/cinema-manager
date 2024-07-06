import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
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
          <Route path='edit' element={<Navigate to='/actors/edit/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
