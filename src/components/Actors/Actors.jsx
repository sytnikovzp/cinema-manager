import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
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
          <Route path='new' element={<Navigate to='/actors/new/:id' />} />
          <Route path='edit' element={<Navigate to='/actors/edit/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
