import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SnackbarProvider } from '@/src/contexts/SnackbarContext';

import Layout from '@/src/components/Layout';
import SnackbarNotify from '@/src/components/SnackbarNotify';

import ActorsPage from '@/src/pages/Actors';
import DirectorsPage from '@/src/pages/Directors';
import HomePage from '@/src/pages/Home';
import MoviesPage from '@/src/pages/Movies';
import NotFoundPage from '@/src/pages/NotFound';
import ServicesPage from '@/src/pages/Services';
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
            <Route element={<ServicesPage />} path='services/*' />
            <Route element={<NotFoundPage />} path='*' />
          </Route>
        </Routes>
        <SnackbarNotify />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
