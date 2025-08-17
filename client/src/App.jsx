import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SnackbarProvider } from '@/src/contexts/SnackbarContext';

import Layout from '@/src/components/Layout';
import SnackbarNotify from '@/src/components/SnackbarNotify';

import ActorsPage from '@/src/pages/Actors';
import CountriesPage from '@/src/pages/Countries';
import DirectorsPage from '@/src/pages/Directors';
import GenresPage from '@/src/pages/Genres';
import HomePage from '@/src/pages/Home';
import LocationsPage from '@/src/pages/Locations';
import MoviesPage from '@/src/pages/Movies';
import NotFoundPage from '@/src/pages/NotFound';
import StudiosPage from '@/src/pages/Studios';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route element={<Layout />} path='*'>
            <Route index element={<HomePage />} />
            <Route element={<MoviesPage />} path='movies/*' />
            <Route element={<ActorsPage />} path='actors/*' />
            <Route element={<DirectorsPage />} path='directors/*' />
            <Route element={<StudiosPage />} path='studios/*' />
            <Route element={<GenresPage />} path='genres/*' />
            <Route element={<CountriesPage />} path='countries/*' />
            <Route element={<LocationsPage />} path='locations/*' />
            <Route element={<NotFoundPage />} path='*' />
          </Route>
        </Routes>
        <SnackbarNotify />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
