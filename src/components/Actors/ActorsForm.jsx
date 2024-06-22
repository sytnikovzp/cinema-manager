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
import MenuItem from '@mui/material/MenuItem';
// =============================================
import { createActor, updateActor } from '../../store/slices/actorsSlice';
import { emptyActor, nationalities } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  saveButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';

function ActorForm() {
  const dispatch = useDispatch();
  const actors = useSelector((state) => state.actorsList.actors);

  const { id } = useParams();
  const currentActor = actors.find((actor) => Number(actor.id) === Number(id));

  const navigate = useNavigate();

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/actors/${id}`);
    } else {
      navigate(`/actors`);
    }
  };

  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is a required field'),
    nationality: Yup.string(),
    birthDate: Yup.date(),
    deathDate: Yup.date(),
    image: Yup.string().url('Invalid URL image'),
    biography: Yup.string(),
  });

  const onFormSubmit = (values) => {
    if (values.id) {
      dispatch(updateActor(values));
      navigate(`/actors/${id}`);
    } else {
      dispatch(createActor(values));
      navigate(`/actors`);
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
            <Field name='nationality'>
              {({ field }) => (
                <TextField
                  {...field}
                  id='nationality-select'
                  select
                  fullWidth
                  label='Nationality'
                  error={touched.nationality && Boolean(errors.nationality)}
                  helperText={touched.nationality && errors.nationality}
                >
                  <MenuItem value=''>
                    <b>Nationality select:</b>
                  </MenuItem>
                  {nationalities.map((option) => (
                    <MenuItem key={option.id} value={option.description}>
                      {option.description}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
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
                onChange={(value) =>
                  setFieldValue(
                    'birthDate',
                    value ? value.format('YYYY-MM-DD') : ''
                  )
                }
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
              />
            </LocalizationProvider>
          </Box>

          <Box sx={formItemStyle}>
            <Field
              name='image'
              as={TextField}
              label='Image URL'
              value={values.image}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('image', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='biography'
              as={TextField}
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
            sx={saveButtonFormStyle}
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
      initialValues={currentActor ? currentActor : emptyActor}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default ActorForm;
