import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
// =============================================
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// =============================================
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  ACTORS_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  emptyActor,
} from '../../constants';
// =============================================
import {
  TITLE_NAME_SCHEMA,
  STRING_SCHEMA,
  DATE_SCHEMA,
} from '../../services/itemService';
// =============================================
import {
  getActorById,
  createActor,
  patchActor,
} from '../../services/actorService';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';
// =============================================
import useFetchData from '../../hooks/useFetchData';
// =============================================
import BasicAutocompleteField from '../Autocomplete/BasicAutocompleteField';

function ActorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyActor);

  const { data: countries } = useFetchData(`/${COUNTRIES_ENTITY_NAME}`);

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
    if (id === ':id' || id === undefined) {
      setInitialValues(emptyActor);
    } else {
      fetchActor();
    }
  }, [id, fetchActor]);

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/${ACTORS_ENTITY_NAME}/${id}`);
    } else {
      navigate(`/${ACTORS_ENTITY_NAME}`);
    }
  };

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

  const onFormSubmit = async (values) => {
    try {
      if (values.id) {
        await patchActor(values);
        showSnackbar('Actor updated successfully!', 'success');
        navigate(`/${ACTORS_ENTITY_NAME}/${id}`);
      } else {
        await createActor(values);
        showSnackbar('Actor created successfully!', 'success');
        navigate(`/${ACTORS_ENTITY_NAME}`);
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <Form id='actor-form'>
        <Box sx={formStyle}>
          <Box sx={formItemStyle}>
            <Field
              name='fullName'
              as={TextField}
              label='Full name'
              value={values.fullName}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('fullName', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Box>
          <Box sx={formItemStyle}>
            <BasicAutocompleteField
              name='country'
              options={sortedCountries}
              getOptionLabel={(option) => option.title}
              label='Nationality'
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box sx={formItemStyle}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale='en-gb'
            >
              <DatePicker
                name='birthDate'
                label='Birth date'
                value={
                  values.birthDate
                    ? dayjs(values.birthDate, 'YYYY-MM-DD')
                    : null
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
                sx={{ width: '100%' }}
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
                maxDate={dayjs()}
              />

              <DatePicker
                name='deathDate'
                label='Death date'
                value={
                  values.deathDate
                    ? dayjs(values.deathDate, 'YYYY-MM-DD')
                    : null
                }
                views={['year', 'month', 'day']}
                onChange={(value) =>
                  setFieldValue(
                    'deathDate',
                    value ? value.format('YYYY-MM-DD') : ''
                  )
                }
                sx={{ width: '100%' }}
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
                maxDate={dayjs()}
                minDate={values.birthDate ? dayjs(values.birthDate) : null}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={formItemStyle}>
            <Field
              name='photo'
              as={TextField}
              label='Photo URL'
              value={values.photo}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('photo', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.photo && Boolean(errors.photo)}
              helperText={touched.photo && errors.photo}
            />
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='biography'
              as={TextField}
              id='biography-textarea'
              label='Brief biography of the actor...'
              value={values.biography}
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('biography', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.biography && Boolean(errors.biography)}
              helperText={touched.biography && errors.biography}
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
            type='button'
            variant='contained'
            color='warning'
            sx={buttonFormStyle}
            onClick={goBack}
            startIcon={<ArrowBackIcon />}
          >
            Return
          </Button>

          <Button
            type='submit'
            variant='contained'
            color='success'
            sx={wideButtonFormStyle}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            type='reset'
            variant='contained'
            color='error'
            sx={buttonFormStyle}
            startIcon={<ClearAllIcon />}
          >
            Reset
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default ActorForm;
