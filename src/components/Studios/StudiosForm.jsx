import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
// =============================================
import { Formik, Form, Field, FieldArray } from 'formik';
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
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { InputAdornment, MenuItem, Typography } from '@mui/material';
// =============================================
import { createStudio, updateStudio } from '../../store/slices/studiosSlice';
import { emptyStudio, locations } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  fieldArrayStyle,
  buttonFormStyle,
  saveButtonFormStyle,
} from '../../services/styleService';

function StudioForm() {
  const dispatch = useDispatch();
  const studios = useSelector((state) => state.studiosList.studios);

  const { id } = useParams();
  const currentStudio = studios.find(
    (studio) => Number(studio.id) === Number(id)
  );

  const navigate = useNavigate();

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/studios/${id}`);
    } else {
      navigate(`/studios`);
    }
  };

  const schema = Yup.object().shape({
    title: Yup.string().required('Studio title is a required field'),
    foundationYear: Yup.date(),
    location: Yup.string(),
    logo: Yup.string().url('Invalid URL logo'),
    movies: Yup.array(),
    about: Yup.string(),
  });

  const onFormSubmit = (values) => {
    if (values.id) {
      dispatch(updateStudio(values));
      navigate(`/studios/${id}`);
    } else {
      dispatch(createStudio(values));
      navigate(`/studios`);
    }
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <Form id='studio-form'>
        <Box sx={formStyle}>
          <Box sx={formItemStyle}>
            <Field
              name='title'
              as={TextField}
              label='Studio title'
              value={values.title}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('title', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
          </Box>
          <Box sx={formItemStyle}>
            <Field name='location'>
              {({ field }) => (
                <TextField
                  {...field}
                  id='location-select'
                  select
                  fullWidth
                  label='Location'
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                >
                  <MenuItem value=''>
                    <b>Location select:</b>
                  </MenuItem>
                  {locations.map((option) => (
                    <MenuItem key={option.id} value={option.title}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='foundationYear'
                label='Foundation year'
                value={
                  values.foundationYear
                    ? dayjs().year(values.foundationYear)
                    : null
                }
                views={['year']}
                onChange={(value) =>
                  setFieldValue('foundationYear', value ? value.year() : '')
                }
                sx={{ width: '330px' }}
                slotProps={{
                  textField: {
                    error:
                      touched.foundationYear && Boolean(errors.foundationYear),
                    helperText: touched.foundationYear && errors.foundationYear,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='logo'
              as={TextField}
              label='Logo URL'
              value={values.logo}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('logo', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.logo && Boolean(errors.logo)}
              helperText={touched.logo && errors.logo}
            />
          </Box>
          <Box sx={formItemStyle}>
            <FieldArray name='movies'>
              {({
                push,
                remove,
                form: {
                  values: { movies },
                },
              }) => (
                <>
                  <Stack
                    component='fieldset'
                    form='studio-form'
                    spacing={2}
                    sx={fieldArrayStyle}
                  >
                    <Typography component='legend' variant='h6' gutterBottom>
                      Movies
                    </Typography>
                    {movies.map((movie, index) => (
                      <Stack spacing={2} key={index} direction='row'>
                        <Field
                          name={`movies[${index}]`}
                          as={TextField}
                          label='Movie'
                          fullWidth
                          error={touched.movies && Boolean(errors.movies)}
                          helperText={touched.movies && errors.movies}
                        />
                        {index > 0 && (
                          <IconButton onClick={() => remove(index)}>
                            <RemoveIcon />
                          </IconButton>
                        )}
                        <IconButton onClick={() => push('')}>
                          <AddIcon />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
            </FieldArray>
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='about'
              as={TextField}
              label='General information about the studio...'
              value={values.about}
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('about', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.about && Boolean(errors.about)}
              helperText={touched.about && errors.about}
            />
          </Box>
          <Stack direction='row' justifyContent='center' spacing={1}>
            <Button
              type='button'
              variant='contained'
              sx={buttonFormStyle}
              onClick={goBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
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
        </Box>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentStudio ? currentStudio : emptyStudio}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default StudioForm;
