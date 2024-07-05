import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// =============================================
import { getAllMovies } from './store/slices/moviesSlice';
import { getAllActors } from './store/slices/actorsSlice';
import { getAllDirectors } from './store/slices/directorsSlice';
import { getAllStudios } from './store/slices/studiosSlice';
// =============================================
import Movies from './components/Movies/Movies';
import Actors from './components/Actors/Actors';
import Directors from './components/Directors/Directors';
import Studios from './components/Studios/Studios';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout';
import { ToggleColorMode } from './components/Layout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  return (
    <ToggleColorMode>
      <Router>
        <Routes>
          <Route path='*' element={<Layout />}>
            <Route path='movies/*' element={<Movies />} />
            <Route path='actors/*' element={<Actors />} />
            <Route path='directors/*' element={<Directors />} />
            <Route path='studios/*' element={<Studios />} />
            <Route index element={<HomePage />} />
            <Route path='*' element={<Navigate to='movies' replace />} />
          </Route>
        </Routes>
      </Router>
    </ToggleColorMode>
  );
}

export default App;
