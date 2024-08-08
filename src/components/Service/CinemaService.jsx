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
  SERVICES_ENTITY_NAME,
  GENRES_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  LOCATIONS_ENTITY_NAME,
} from '../../constants';
// =============================================
import ActorsForm from '../Actors/ActorsForm';
import DirectorsForm from '../Directors/DirectorsForm';
import MoviesForm from '../Movies/MoviesForm';
import StudiosForm from '../Studios/StudiosForm';
import GenresForm from '../Service/GenresForm';
import CountriesForm from './CountriesForm';
import LocationsForm from './LocationsForm';

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
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${GENRES_ENTITY_NAME}`}
            element={<GenresForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${GENRES_ENTITY_NAME}/:id`}
            element={<GenresForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${GENRES_ENTITY_NAME}`}
            element={<GenresForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${GENRES_ENTITY_NAME}/:id`}
            element={<GenresForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${COUNTRIES_ENTITY_NAME}`}
            element={<CountriesForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${COUNTRIES_ENTITY_NAME}/:id`}
            element={<CountriesForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${COUNTRIES_ENTITY_NAME}`}
            element={<CountriesForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${COUNTRIES_ENTITY_NAME}/:id`}
            element={<CountriesForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${LOCATIONS_ENTITY_NAME}`}
            element={<LocationsForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/new-${LOCATIONS_ENTITY_NAME}/:id`}
            element={<LocationsForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${LOCATIONS_ENTITY_NAME}`}
            element={<LocationsForm />}
          />
          <Route
            path={`/${SERVICES_ENTITY_NAME}/edit-${LOCATIONS_ENTITY_NAME}/:id`}
            element={<LocationsForm />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CinemaService;
