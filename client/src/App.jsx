import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SnackbarProvider } from '@/src/contexts/SnackbarContext';

import Actors from '@/src/components/Actors/Actors';
import Directors from '@/src/components/Directors/Directors';
import HomePage from '@/src/components/HomePage/HomePage';
import Layout from '@/src/components/Layout/Layout';
import Movies from '@/src/components/Movies/Movies';
import Services from '@/src/components/Service/Services';
import SnackbarNotify from '@/src/components/SnackbarNotify/SnackbarNotify';
import Studios from '@/src/components/Studios/Studios';

import NotFoundPage from '@/src/pages/NotFound/NotFoundPage';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route element={<Layout />} path='*'>
            <Route index element={<HomePage />} />
            <Route element={<Movies />} path='movies/*' />
            <Route element={<Actors />} path='actors/*' />
            <Route element={<Directors />} path='directors/*' />
            <Route element={<Studios />} path='studios/*' />
            <Route element={<Services />} path='services/*' />
            <Route element={<NotFoundPage />} path='*' />
          </Route>
        </Routes>
        <SnackbarNotify />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
