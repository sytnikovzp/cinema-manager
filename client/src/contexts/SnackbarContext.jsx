import { createContext } from 'react';
// =============================================
import useSnackbar from '../hooks/useSnackbar';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const snackbar = useSnackbar();

  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
