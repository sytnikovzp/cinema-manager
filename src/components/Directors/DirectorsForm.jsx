import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import Autocomplete from '@mui/material/Autocomplete';
// =============================================
import {
  createDirector,
  updateDirector,
} from '../../store/slices/directorsSlice';
import { emptyDirector, nationalities } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';

function DirectorForm() {
  const dispatch = useDispatch();
  const directors = useSelector((state) => state.directorsList.directors);

  const { id } = useParams();
  const currentDirector = directors.find(
    (director) => Number(director.id) === Number(id)
  );

  const navigate = useNavigate();

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/directors/${id}`);
    } else {
      navigate(`/directors`);
    }
  };

  const sortedNationalities = nationalities
    .slice()
    .sort((a, b) => a.description.localeCompare(b.description));

  const schema = Yup.object().shape({
    full_name: Yup.string().required('Full name is a required field'),
    nationality: Yup.string(),
    birth_date: Yup.date(),
    death_date: Yup.date(),
    photo: Yup.string().url('Invalid URL photo'),
    biography: Yup.string(),
  });

  const onFormSubmit = (values) => {
    if (values.id) {
      dispatch(updateDirector(values));
      navigate(`/directors/${id}`);
    } else {
      dispatch(createDirector(values));
      navigate(`/directors`);
    }
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <Form id='director-form'>
        <Box sx={formStyle}>
          <Box sx={formItemStyle}>
            <Field
              name='full_name'
              as={TextField}
              label='Full name'
              value={values.full_name}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('full_name', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.full_name && Boolean(errors.full_name)}
              helperText={touched.full_name && errors.full_name}
            />
          </Box>
          <Box sx={formItemStyle}>
            <Field name='nationality'>
              {({ field, form }) => {
                const currentValue =
                  sortedNationalities.find(
                    (option) => option.description === field.value
                  ) || null;

                return (
                  <Autocomplete
                    disablePortal
                    id='nationality-select'
                    options={sortedNationalities}
                    getOptionLabel={(option) => option.description}
                    fullWidth
                    value={currentValue}
                    onChange={(event, value) =>
                      form.setFieldValue(
                        field.name,
                        value ? value.description : ''
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Nationality'
                        error={
                          form.touched[field.name] &&
                          Boolean(form.errors[field.name])
                        }
                        helperText={
                          form.touched[field.name] && form.errors[field.name]
                        }
                      />
                    )}
                  />
                );
              }}
            </Field>
          </Box>
          <Box sx={formItemStyle}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale='en-gb'
            >
              <DatePicker
                name='birth_date'
                label='Birth date'
                value={
                  values.birth_date
                    ? dayjs(values.birth_date, 'YYYY-MM-DD')
                    : null
                }
                views={['year', 'month', 'day']}
                onChange={(value) =>
                  setFieldValue(
                    'birth_date',
                    value ? value.format('YYYY-MM-DD') : ''
                  )
                }
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    InputProps: {
                      style: { fontSize: 14 },
                    },
                    error: touched.birth_date && Boolean(errors.birth_date),
                    helperText: touched.birth_date && errors.birth_date,
                  },
                  field: {
                    clearable: true,
                    onClear: () => setFieldValue('birth_date', ''),
                  },
                }}
                maxDate={dayjs()}
              />

              <DatePicker
                name='death_date'
                label='Death date'
                value={
                  values.death_date
                    ? dayjs(values.death_date, 'YYYY-MM-DD')
                    : null
                }
                views={['year', 'month', 'day']}
                onChange={(value) =>
                  setFieldValue(
                    'death_date',
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
                    error: touched.death_date && Boolean(errors.death_date),
                    helperText: touched.death_date && errors.death_date,
                  },
                  field: {
                    clearable: true,
                    onClear: () => setFieldValue('death_date', ''),
                  },
                }}
                maxDate={dayjs()}
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
              label='Brief biography of the director...'
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
      initialValues={currentDirector || emptyDirector}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default DirectorForm;
