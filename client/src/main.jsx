import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';

import store from './store';

import { ColorThemeProvider } from './contexts/ColorThemeProvider';
import App from './App';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <ColorThemeProvider>
      <CssBaseline />
      <App />
    </ColorThemeProvider>
  </Provider>
);
