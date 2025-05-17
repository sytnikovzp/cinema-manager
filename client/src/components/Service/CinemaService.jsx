import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  styleCinemaServiceBox,
  styleCinemaServiceTypography,
} from '../../services/styleService';

import ActorsForm from '../Actors/ActorsForm';
import DirectorsForm from '../Directors/DirectorsForm';
import MoviesForm from '../Movies/MoviesForm';
import StudiosForm from '../Studios/StudiosForm';

import CountriesForm from './CountriesForm';
import GenresForm from './GenresForm';
import LocationsForm from './LocationsForm';

function CinemaService() {
  return (
    <Box sx={styleCinemaServiceBox}>
      <Paper elevation={3}>
        <Typography sx={styleCinemaServiceTypography} variant='h5'>
          Cinema service
        </Typography>
        <Routes>
          <Route element={<ActorsForm />} path={`/actors/new`} />
          <Route element={<ActorsForm />} path={`/actors/new/:id`} />
          <Route element={<ActorsForm />} path={`/actors/edit`} />
          <Route element={<ActorsForm />} path={`/actors/edit/:id`} />
          <Route element={<DirectorsForm />} path={`/directors/new`} />
          <Route element={<DirectorsForm />} path={`/directors/new/:id`} />
          <Route element={<DirectorsForm />} path={`/directors/edit`} />
          <Route element={<DirectorsForm />} path={`/directors/edit/:id`} />
          <Route element={<MoviesForm />} path={`/movies/new`} />
          <Route element={<MoviesForm />} path={`/movies/new/:id`} />
          <Route element={<MoviesForm />} path={`/movies/edit`} />
          <Route element={<MoviesForm />} path={`/movies/edit/:id`} />
          <Route element={<StudiosForm />} path={`/studios/new`} />
          <Route element={<StudiosForm />} path={`/studios/new/:id`} />
          <Route element={<StudiosForm />} path={`/studios/edit`} />
          <Route element={<StudiosForm />} path={`/studios/edit/:id`} />
          <Route element={<GenresForm />} path={`/services/new-genres`} />
          <Route element={<GenresForm />} path={`/services/new-genres/:id`} />
          <Route element={<GenresForm />} path={`/services/edit-genres`} />
          <Route element={<GenresForm />} path={`/services/edit-genres/:id`} />
          <Route element={<CountriesForm />} path={`/services/new-countries`} />
          <Route
            element={<CountriesForm />}
            path={`/services/new-countries/:id`}
          />
          <Route
            element={<CountriesForm />}
            path={`/services/edit-countries`}
          />
          <Route
            element={<CountriesForm />}
            path={`/services/edit-countries/:id`}
          />
          <Route element={<LocationsForm />} path={`/services/new-locations`} />
          <Route
            element={<LocationsForm />}
            path={`/services/new-locations/:id`}
          />
          <Route
            element={<LocationsForm />}
            path={`/services/edit-locations`}
          />
          <Route
            element={<LocationsForm />}
            path={`/services/edit-locations/:id`}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CinemaService;
