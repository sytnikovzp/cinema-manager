import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
// ===================================
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// ===================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// ===================================
import {
  createActor,
  updateActor,
  deleteActor,
} from '../../store/slices/actorsSlice';
import { emptyActor } from '../../constants';
import { actorFormItemStyle } from '../../services/styleService';
import { buttonFormStyle } from '../../services/styleService';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers';

function ActorForm() {
  const dispatch = useDispatch();
  const actors = useSelector((state) => state.actorsList.actors);

  const { id } = useParams();
  const navigate = useNavigate();

  const currentActor = actors.find((actor) => actor.id === Number(id));

  // const status = useSelector((state) => state.actorList.status);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();

  // useEffect(() => {
  //   if (status && status !== null) {
  //     setOpen(true);
  //     if (status.toLowerCase().includes('success')) {
  //       setSeverity('success');
  //     } else {
  //       return setSeverity('error');
  //     }
  //   }
  // }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const goBack = () => {
    navigate('/actors');
  };

  const schema = Yup.object().shape({
    // eMail: Yup.string()
    //   .email('Invalid email address')
    //   .required('Email is a required field'),
    // cPhone: Yup.string()
    //   .matches(
    //     cPhoneRegExp,
    //     'The phone must be in the format +38(0XX) XXX-XX-XX'
    //   )
    //   .required('Phone is a required field'),
  });

  const onFormSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateActor(values));
    } else {
      dispatch(createActor(values));
      resetForm();
    }
  };

  const onActorDelete = () => {
    dispatch(deleteActor(currentActor.id));
  };

  const renderForm = ({ errors, touched, setFieldValue }) => {
    return (
      <Form id='actor-form'>
        <Box
          sx={{
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <Box sx={actorFormItemStyle}>
            <Field
              name='fullName'
              as={TextField}
              label='Full name'
              variant='filled'
              fullWidth
            />
            <IconButton onClick={() => setFieldValue('fullName', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={actorFormItemStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DatePicker
                name='birthYear'
                label='Birth year'
                variant='filled'
              />
            </LocalizationProvider>
          </Box>
          <Box sx={actorFormItemStyle}>
            <Field
              name='nationality'
              as={TextField}
              label='Nationality'
              variant='filled'
              fullWidth
              // error={touched.eMail && Boolean(errors.eMail)}
              // helperText={touched.eMail && errors.eMail}
            />
            <IconButton onClick={() => setFieldValue('nationality', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={actorFormItemStyle}>
            <Field
              name='image'
              as={TextField}
              label='Image URL'
              variant='filled'
              fullWidth
              // error={touched.cPhone && Boolean(errors.cPhone)}
              // helperText={touched.cPhone && errors.cPhone}
            />
            <IconButton onClick={() => setFieldValue('image', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>

          <Box sx={actorFormItemStyle}>
            <Field
              name='movies'
              as={TextField}
              label='Movies'
              variant='filled'
              fullWidth
              // error={touched.cPhone && Boolean(errors.cPhone)}
              // helperText={touched.cPhone && errors.cPhone}
            />
            <IconButton onClick={() => setFieldValue('movies', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>

          <Stack direction='row' justifyContent='center' spacing={1}>
            <Button
              type='submit'
              id='save-btn'
              variant='contained'
              color='success'
              style={buttonFormStyle}
            >
              Save
            </Button>

            <Button
              id='delButton'
              type='button'
              variant='contained'
              color='error'
              style={buttonFormStyle}
              onClick={onActorDelete}
            >
              Delete
            </Button>

            <Button
              type='submit'
              id='save-btn'
              variant='contained'
              style={buttonFormStyle}
              onClick={goBack}
            >
              Go back
            </Button>
          </Stack>
        </Box>
      </Form>
    );
  };

  return (
    <>
      <Formik
        initialValues={currentActor ? currentActor : emptyActor}
        onSubmit={onFormSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {renderForm}
      </Formik>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {status}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

ActorForm.propTypes = {
  currentActor: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActorForm;
