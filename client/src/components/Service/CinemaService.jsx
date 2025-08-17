import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  styleCinemaServiceBox,
  styleCinemaServiceTypography,
} from '@/src/services/styleService';

import ActorsForm from '@/src/components/forms/ActorsForm';
import CountriesForm from '@/src/components/forms/CountriesForm';
import DirectorsForm from '@/src/components/forms/DirectorsForm';
import GenresForm from '@/src/components/forms/GenresForm';
import LocationsForm from '@/src/components/forms/LocationsForm';
import MoviesForm from '@/src/components/forms/MoviesForm';
import StudiosForm from '@/src/components/forms/StudiosForm';

function CinemaService() {
  return (
    <Box sx={styleCinemaServiceBox}>
      <Paper elevation={3}>
        <Typography sx={styleCinemaServiceTypography} variant='h5'>
          Cinema service
        </Typography>
        <Routes>
          <Route element={<ActorsForm />} path={`/actors/new`} />
          <Route element={<ActorsForm />} path={`/actors/new/:uuid`} />
          <Route element={<ActorsForm />} path={`/actors/edit`} />
          <Route element={<ActorsForm />} path={`/actors/edit/:uuid`} />
          <Route element={<DirectorsForm />} path={`/directors/new`} />
          <Route element={<DirectorsForm />} path={`/directors/new/:uuid`} />
          <Route element={<DirectorsForm />} path={`/directors/edit`} />
          <Route element={<DirectorsForm />} path={`/directors/edit/:uuid`} />
          <Route element={<MoviesForm />} path={`/movies/new`} />
          <Route element={<MoviesForm />} path={`/movies/new/:uuid`} />
          <Route element={<MoviesForm />} path={`/movies/edit`} />
          <Route element={<MoviesForm />} path={`/movies/edit/:uuid`} />
          <Route element={<StudiosForm />} path={`/studios/new`} />
          <Route element={<StudiosForm />} path={`/studios/new/:uuid`} />
          <Route element={<StudiosForm />} path={`/studios/edit`} />
          <Route element={<StudiosForm />} path={`/studios/edit/:uuid`} />
          <Route element={<GenresForm />} path={`/services/new-genres`} />
          <Route element={<GenresForm />} path={`/services/new-genres/:uuid`} />
          <Route element={<GenresForm />} path={`/services/edit-genres`} />
          <Route
            element={<GenresForm />}
            path={`/services/edit-genres/:uuid`}
          />
          <Route element={<CountriesForm />} path={`/services/new-countries`} />
          <Route
            element={<CountriesForm />}
            path={`/services/new-countries/:uuid`}
          />
          <Route
            element={<CountriesForm />}
            path={`/services/edit-countries`}
          />
          <Route
            element={<CountriesForm />}
            path={`/services/edit-countries/:uuid`}
          />
          <Route element={<LocationsForm />} path={`/services/new-locations`} />
          <Route
            element={<LocationsForm />}
            path={`/services/new-locations/:uuid`}
          />
          <Route
            element={<LocationsForm />}
            path={`/services/edit-locations`}
          />
          <Route
            element={<LocationsForm />}
            path={`/services/edit-locations/:uuid`}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CinemaService;
