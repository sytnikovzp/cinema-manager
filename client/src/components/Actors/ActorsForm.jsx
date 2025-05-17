import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveIcon from '@mui/icons-material/Save';

import { emptyActor } from '../../constants';
import useFetchData from '../../hooks/useFetchData';

import {
  createActor,
  getActorById,
  updateActor,
} from '../../services/actorService';
import {
  DATE_SCHEMA,
  STRING_SCHEMA,
  TITLE_NAME_SCHEMA,
} from '../../services/itemService';
import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import BasicAutocompleteField from '../Autocomplete/BasicAutocompleteField';

import 'dayjs/locale/en-gb';

function ActorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyActor);

  const { data: countries } = useFetchData(`/countries`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchActor = useCallback(async () => {
    try {
      const actor = await getActorById(id);
      setInitialValues(actor);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id') {
      setInitialValues(emptyActor);
    } else {
      fetchActor();
    }
  }, [id, fetchActor]);

  const handleGoBack = useCallback(() => {
    if (id === ':id') {
      navigate(`/actors`);
    } else {
      navigate(`/actors/${id}`);
    }
  }, [id, navigate]);

  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const validationSchema = Yup.object().shape({
    fullName: TITLE_NAME_SCHEMA,
    country: STRING_SCHEMA,
    birthDate: DATE_SCHEMA,
    deathDate: DATE_SCHEMA,
    photo: STRING_SCHEMA.url('Invalid photo URL'),
    biography: STRING_SCHEMA,
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.id) {
          await updateActor(values);
          showSnackbar('Actor updated successfully!', 'success');
          navigate(`/actors/${id}`);
        } else {
          await createActor(values);
          showSnackbar('Actor created successfully!', 'success');
          navigate(`/actors`);
        }
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [id, navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='actor-form'>
      <Box sx={formStyle}>
        <Box sx={formItemStyle}>
          <Field
            fullWidth
            as={TextField}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('fullName', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Full name'
            name='fullName'
            value={values.fullName}
          />
        </Box>
        <Box sx={formItemStyle}>
          <BasicAutocompleteField
            getOptionLabel={(option) => option.title}
            label='Nationality'
            name='country'
            options={sortedCountries}
            setFieldValue={setFieldValue}
          />
        </Box>
        <Box sx={formItemStyle}>
          <LocalizationProvider
            adapterLocale='en-gb'
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label='Birth date'
              maxDate={dayjs()}
              name='birthDate'
              slotProps={{
                textField: {
                  InputProps: {
                    style: { fontSize: 14 },
                  },
                  error: touched.birthDate && Boolean(errors.birthDate),
                  helperText: touched.birthDate && errors.birthDate,
                },
                field: {
                  clearable: true,
                  onClear: () => setFieldValue('birthDate', ''),
                },
              }}
              sx={{ width: '100%' }}
              value={
                values.birthDate ? dayjs(values.birthDate, 'YYYY-MM-DD') : null
              }
              views={['year', 'month', 'day']}
              onChange={(value) => {
                setFieldValue(
                  'birthDate',
                  value ? value.format('YYYY-MM-DD') : ''
                );
                if (
                  value &&
                  values.deathDate &&
                  dayjs(values.deathDate).isBefore(value)
                ) {
                  setFieldValue('deathDate', '');
                }
              }}
            />

            <DatePicker
              label='Death date'
              maxDate={dayjs()}
              minDate={values.birthDate ? dayjs(values.birthDate) : null}
              name='deathDate'
              size='small'
              slotProps={{
                textField: {
                  InputProps: {
                    style: { fontSize: 14 },
                  },
                  error: touched.deathDate && Boolean(errors.deathDate),
                  helperText: touched.deathDate && errors.deathDate,
                },
                field: {
                  clearable: true,
                  onClear: () => setFieldValue('deathDate', ''),
                },
              }}
              sx={{ width: '100%' }}
              value={
                values.deathDate ? dayjs(values.deathDate, 'YYYY-MM-DD') : null
              }
              views={['year', 'month', 'day']}
              onChange={(value) =>
                setFieldValue(
                  'deathDate',
                  value ? value.format('YYYY-MM-DD') : ''
                )
              }
            />
          </LocalizationProvider>
        </Box>

        <Box sx={formItemStyle}>
          <Field
            fullWidth
            as={TextField}
            error={touched.photo && Boolean(errors.photo)}
            helperText={touched.photo && errors.photo}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('photo', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Photo URL'
            name='photo'
            value={values.photo}
          />
        </Box>
        <Box sx={formItemStyle}>
          <Field
            fullWidth
            multiline
            as={TextField}
            error={touched.biography && Boolean(errors.biography)}
            helperText={touched.biography && errors.biography}
            id='biography-textarea'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('biography', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Brief biography of the actor...'
            maxRows={6}
            minRows={4}
            name='biography'
            value={values.biography}
          />
        </Box>
      </Box>
      <Stack
        direction='row'
        justifyContent='center'
        spacing={1}
        sx={stackButtonFormStyle}
      >
        <Button
          color='warning'
          startIcon={<ArrowBackIcon />}
          sx={buttonFormStyle}
          type='button'
          variant='contained'
          onClick={handleGoBack}
        >
          Return
        </Button>

        <Button
          color='success'
          startIcon={<SaveIcon />}
          sx={wideButtonFormStyle}
          type='submit'
          variant='contained'
        >
          Save
        </Button>

        <Button
          color='error'
          startIcon={<ClearAllIcon />}
          sx={buttonFormStyle}
          type='reset'
          variant='contained'
        >
          Reset
        </Button>
      </Stack>
    </Form>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default ActorForm;
