import { Route, Routes } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// =============================================
import ActorsForm from '../Actors/ActorsForm';
import DirectorsForm from '../Directors/DirectorsForm';
import MoviesForm from '../Movies/MoviesForm';
import StudiosForm from '../Studios/StudiosForm';

function CinemaService() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        m: 2,
      }}
    >
      <Paper elevation={3}>
        <h2>Cinema service</h2>
      </Paper>
      <Routes>
        <Route path='/actors/new' element={<ActorsForm />} />
        <Route path='/actors/new/:id' element={<ActorsForm />} />
        <Route path='/directors/new' element={<DirectorsForm />} />
        <Route path='/directors/new/:id' element={<DirectorsForm />} />
        <Route path='/movies/new' element={<MoviesForm />} />
        <Route path='/movies/new/:id' element={<MoviesForm />} />
        <Route path='/studios/new' element={<StudiosForm />} />
        <Route path='/studios/new/:id' element={<StudiosForm />} />
      </Routes>
    </Box>
  );
}

export default CinemaService;
