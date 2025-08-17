import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';

import { ColorThemeProvider } from '@/src/contexts/ColorThemeProvider';

import store from '@/src/store';

import App from '@/src/App';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <ColorThemeProvider>
      <CssBaseline />
      <App />
    </ColorThemeProvider>
  </Provider>
);
