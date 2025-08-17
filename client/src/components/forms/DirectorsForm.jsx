import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, isBefore, parse } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Field, Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveIcon from '@mui/icons-material/Save';

import SnackbarContext from '@/src/contexts/SnackbarContext';
import { PERSON_VALIDATION_SCHEME } from '@/src/utils/validationSchemes';
import useFetchData from '@/src/hooks/useFetchData';

import {
  createDirector,
  getDirectorByUuid,
  updateDirector,
} from '@/src/services/directorService';

import BasicAutocompleteField from '@/src/components/forms/Autocomplete/BasicAutocompleteField';

import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '@/src/styles';

const emptyDirector = {
  uuid: null,
  fullName: '',
  country: '',
  birthDate: '',
  deathDate: '',
  photo: '',
  biography: '',
};

function DirectorForm() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyDirector);

  const { data: countries } = useFetchData(`/countries`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchDirector = useCallback(async () => {
    try {
      const director = await getDirectorByUuid(uuid);
      setInitialValues({
        ...director,
        country:
          typeof director.country === 'object'
            ? director.country.title
            : director.country,
      });
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setInitialValues(emptyDirector);
    } else {
      fetchDirector();
    }
  }, [uuid, fetchDirector]);

  const handleGoBack = useCallback(() => {
    if (uuid === ':uuid') {
      navigate(`/directors`);
    } else {
      navigate(`/directors/${uuid}`);
    }
  }, [uuid, navigate]);

  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.uuid) {
          await updateDirector(values);
          showSnackbar('Director updated successfully!', 'success');
          navigate(`/directors/${uuid}`);
        } else {
          await createDirector(values);
          showSnackbar('Director created successfully!', 'success');
          navigate(`/directors`);
        }
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [uuid, navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='director-form'>
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
            adapterLocale={enGB}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              label='Birth date'
              maxDate={new Date()}
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
                values.birthDate
                  ? parse(values.birthDate, 'dd MMMM yyyy', new Date(), {
                      locale: enGB,
                    })
                  : null
              }
              views={['year', 'month', 'day']}
              onChange={(value) => {
                const formatted = value ? format(value, 'dd MMMM yyyy') : '';
                setFieldValue('birthDate', formatted);
                if (
                  value &&
                  values.deathDate &&
                  isBefore(
                    parse(values.deathDate, 'dd MMMM yyyy', new Date(), {
                      locale: enGB,
                    }),
                    value
                  )
                ) {
                  setFieldValue('deathDate', '');
                }
              }}
            />

            <DatePicker
              label='Death date'
              maxDate={new Date()}
              minDate={
                values.birthDate
                  ? parse(values.birthDate, 'dd MMMM yyyy', new Date(), {
                      locale: enGB,
                    })
                  : null
              }
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
                values.deathDate
                  ? parse(values.deathDate, 'dd MMMM yyyy', new Date(), {
                      locale: enGB,
                    })
                  : null
              }
              views={['year', 'month', 'day']}
              onChange={(value) =>
                setFieldValue(
                  'deathDate',
                  value ? format(value, 'dd MMMM yyyy') : ''
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
            label='Brief biography of the director...'
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
      validationSchema={PERSON_VALIDATION_SCHEME}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default DirectorForm;
