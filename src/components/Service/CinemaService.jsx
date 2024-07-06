import { Route, Routes } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
// =============================================
import ActorsForm from '../Actors/ActorsForm';
import DirectorsForm from '../Directors/DirectorsForm';
import MoviesForm from '../Movies/MoviesForm';
import StudiosForm from '../Studios/StudiosForm';

function CinemaService() {
  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper elevation={3}>
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          Cinema service
        </Typography>
        <Routes>
          <Route path='/actors/new' element={<ActorsForm />} />
          <Route path='/actors/new/:id' element={<ActorsForm />} />
          <Route path='/actors/edit' element={<ActorsForm />} />
          <Route path='/actors/edit/:id' element={<ActorsForm />} />
          <Route path='/directors/new' element={<DirectorsForm />} />
          <Route path='/directors/new/:id' element={<DirectorsForm />} />
          <Route path='/directors/edit' element={<DirectorsForm />} />
          <Route path='/directors/edit/:id' element={<DirectorsForm />} />
          <Route path='/movies/new' element={<MoviesForm />} />
          <Route path='/movies/new/:id' element={<MoviesForm />} />
          <Route path='/movies/edit' element={<MoviesForm />} />
          <Route path='/movies/edit/:id' element={<MoviesForm />} />
          <Route path='/studios/new' element={<StudiosForm />} />
          <Route path='/studios/new/:id' element={<StudiosForm />} />
          <Route path='/studios/edit' element={<StudiosForm />} />
          <Route path='/studios/edit/:id' element={<StudiosForm />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CinemaService;
