import { Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
          <Route path='/' element={<ActorsList />} />
          <Route path=':actorId' element={<ActorsItem />} />
          <Route path='new' element={<Navigate to='/actors/new/:actorId' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
