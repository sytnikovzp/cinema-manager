import { useContext } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import SnackbarContext from '@/src/contexts/SnackbarContext';

function SnackbarNotify() {
  const { snackbar, handleClose } = useContext(SnackbarContext);

  return (
    <Snackbar
      autoHideDuration={1500}
      open={snackbar.open}
      onClose={handleClose}
    >
      <Alert
        severity={snackbar.severity}
        variant='filled'
        onClose={handleClose}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarNotify;
