import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// =============================================
import { ColorThemeProvider } from './contexts/ThemeContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  ACTORS_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
  SERVICES_ENTITY_NAME,
} from './constants';
// =============================================
import HomePage from './components/HomePage/HomePage';
import Movies from './components/Movies/Movies';
import Actors from './components/Actors/Actors';
import Directors from './components/Directors/Directors';
import Studios from './components/Studios/Studios';
import Services from './components/Service/Services';
import Layout from './components/Layout';
import SnackbarComponent from './components/SnackbarComponent';

function App() {
  return (
    <ColorThemeProvider>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route path='*' element={<Layout />}>
              <Route path={`${MOVIES_ENTITY_NAME}/*`} element={<Movies />} />
              <Route path={`${ACTORS_ENTITY_NAME}/*`} element={<Actors />} />
              <Route path={`${DIRECTORS_ENTITY_NAME}/*`} element={<Directors />} />
              <Route path={`${STUDIOS_ENTITY_NAME}/*`} element={<Studios />} />
              <Route path={`${SERVICES_ENTITY_NAME}/*`} element={<Services />} />
              <Route index element={<HomePage />} />
              <Route path='*' element={<Navigate to='movies' replace />} />
            </Route>
          </Routes>
          <SnackbarComponent />
        </Router>
      </SnackbarProvider>
    </ColorThemeProvider>
  );
}

export default App;
