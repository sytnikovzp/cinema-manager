import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Actors from './components/Actors/Actors';
import Directors from './components/Directors/Directors';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import Movies from './components/Movies/Movies';
import Services from './components/Service/Services';
import SnackbarNotify from './components/SnackbarNotify/SnackbarNotify';
import Studios from './components/Studios/Studios';

import { SnackbarProvider } from './contexts/SnackbarContext';

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
            <Route element={<Navigate replace to='/' />} path='*' />
          </Route>
        </Routes>
        <SnackbarNotify />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
