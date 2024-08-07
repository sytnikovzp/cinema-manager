import { Route, Routes } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// =============================================
import {
  ACTORS_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  MOVIES_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
} from '../../constants';
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
          <Route path={`/${ACTORS_ENTITY_NAME}/new`} element={<ActorsForm />} />
          <Route
            path={`/${ACTORS_ENTITY_NAME}/new/:id`}
            element={<ActorsForm />}
          />
          <Route
            path={`/${ACTORS_ENTITY_NAME}/edit`}
            element={<ActorsForm />}
          />
          <Route
            path={`/${ACTORS_ENTITY_NAME}/edit/:id`}
            element={<ActorsForm />}
          />
          <Route
            path={`/${DIRECTORS_ENTITY_NAME}/new`}
            element={<DirectorsForm />}
          />
          <Route
            path={`/${DIRECTORS_ENTITY_NAME}/new/:id`}
            element={<DirectorsForm />}
          />
          <Route
            path={`/${DIRECTORS_ENTITY_NAME}/edit`}
            element={<DirectorsForm />}
          />
          <Route
            path={`/${DIRECTORS_ENTITY_NAME}/edit/:id`}
            element={<DirectorsForm />}
          />
          <Route path={`/${MOVIES_ENTITY_NAME}/new`} element={<MoviesForm />} />
          <Route
            path={`/${MOVIES_ENTITY_NAME}/new/:id`}
            element={<MoviesForm />}
          />
          <Route
            path={`/${MOVIES_ENTITY_NAME}/edit`}
            element={<MoviesForm />}
          />
          <Route
            path={`/${MOVIES_ENTITY_NAME}/edit/:id`}
            element={<MoviesForm />}
          />
          <Route
            path={`/${STUDIOS_ENTITY_NAME}/new`}
            element={<StudiosForm />}
          />
          <Route
            path={`/${STUDIOS_ENTITY_NAME}/new/:id`}
            element={<StudiosForm />}
          />
          <Route
            path={`/${STUDIOS_ENTITY_NAME}/edit`}
            element={<StudiosForm />}
          />
          <Route
            path={`/${STUDIOS_ENTITY_NAME}/edit/:id`}
            element={<StudiosForm />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CinemaService;
