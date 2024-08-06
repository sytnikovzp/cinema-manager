import { useContext } from 'react';
// =============================================
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// =============================================
import SnackbarContext from '../contexts/SnackbarContext';

const SnackbarComponent = () => {
  const { snackbar, handleClose } = useContext(SnackbarContext);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
