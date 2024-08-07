import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// =============================================
import { ThemeProvider } from './contexts/ThemeContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
// =============================================
import Movies from './components/Movies/Movies';
import Actors from './components/Actors/Actors';
import Directors from './components/Directors/Directors';
import Studios from './components/Studios/Studios';
import HomePage from './components/HomePage/HomePage';
import SnackbarComponent from './components/SnackbarComponent';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
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
          <SnackbarComponent />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
