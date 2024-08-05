import { useState, useCallback } from 'react';

const useSnackbar = (onCloseCallback) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbar((prevSnackbar) => ({
        ...prevSnackbar,
        open: false,
      }));
      if (onCloseCallback) {
        onCloseCallback();
      }
    },
    [onCloseCallback]
  );

  return {
    snackbar,
    showSnackbar,
    handleClose,
  };
};

export default useSnackbar;
