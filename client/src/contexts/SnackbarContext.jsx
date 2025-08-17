import { createContext } from 'react';

import useSnackbar from '@/src/hooks/useSnackbar';

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const snackbar = useSnackbar();

  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarContext;
