import { useState } from 'react';
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
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Autocomplete from '@mui/material/Autocomplete';
// =============================================
import { createMovie, updateMovie } from '../../store/slices/moviesSlice';
import { emptyMovie, genres } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  fieldArrayStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  addButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';

function MovieForm() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesList.movies);
  const actorsList = useSelector((state) => state.actorsList.actors);
  const directorsList = useSelector((state) => state.directorsList.directors);
  const studiosList = useSelector((state) => state.studiosList.studios);

  const { id } = useParams();
  const currentMovie = movies.find((movie) => Number(movie.id) === Number(id));

  const navigate = useNavigate();

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/movies/${id}`);
    } else {
      navigate(`/movies`);
    }
  };

  const optionsForActors =
    actorsList.length > 1
      ? actorsList.map((option) => {
          const firstLetter = option.full_name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        })
      : [];

  const optionsForDirectors =
    directorsList.length > 1
      ? directorsList.map((option) => {
          const firstLetter = option.full_name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        })
      : [];

  const optionsForStudios =
    studiosList.length > 1
      ? studiosList.map((option) => {
          const firstLetter = option.title[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        })
      : [];

  const sortedGenres = genres
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const steps = ['General', 'Directors', 'Actors', 'Studios', 'Storyline'];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async (event, validateForm, setTouched) => {
    event.preventDefault();
    setTouched({
      title: true,
    });

    const errors = await validateForm();
    if (Object.keys(errors).length === 0 && activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (event, resetForm) => {
    event.preventDefault();
    resetForm();
  };

  const schema = Yup.object().shape({
    title: Yup.string().required('Movie title is a required field'),
    genre: Yup.string(),
    release_year: Yup.date(),
    poster: Yup.string().url('Invalid URL poster'),
    trailer: Yup.string().url('Invalid Youtube URL trailer'),
    directors: Yup.array(),
    actors: Yup.array(),
    studios: Yup.array(),
    storyline: Yup.string(),
  });

  const onFormSubmit = (values) => {
    if (values.id) {
      dispatch(updateMovie(values));
      navigate(`/movies/${id}`);
    } else {
      dispatch(createMovie(values));
      navigate(`/movies`);
    }
  };

  const renderForm = ({
    values,
    errors,
    touched,
    setFieldValue,
    validateForm,
    setTouched,
    resetForm,
  }) => {
    return (
      <Form id='movie-form'>
        <Box sx={formStyle}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <>
              <Box sx={formItemStyle}>
                <Field
                  name='title'
                  as={TextField}
                  label='Movie title'
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
                <Field name='genre'>
                  {({ field, form }) => {
                    const currentValue =
                      sortedGenres.find(
                        (option) => option.title === field.value
                      ) || null;

                    return (
                      <Autocomplete
                        disablePortal
                        id='genre-select'
                        options={sortedGenres}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        value={currentValue}
                        onChange={(event, value) =>
                          form.setFieldValue(
                            field.name,
                            value ? value.title : ''
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Genre movie'
                            error={
                              form.touched[field.name] &&
                              Boolean(form.errors[field.name])
                            }
                            helperText={
                              form.touched[field.name] &&
                              form.errors[field.name]
                            }
                          />
                        )}
                      />
                    );
                  }}
                </Field>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name='date'
                    label='Release year'
                    value={
                      values.release_year
                        ? dayjs().year(values.release_year)
                        : null
                    }
                    views={['year']}
                    onChange={(value) =>
                      setFieldValue('release_year', value ? value.year() : '')
                    }
                    sx={{ width: '330px' }}
                    slotProps={{
                      textField: {
                        error:
                          touched.release_year && Boolean(errors.release_year),
                        helperText: touched.release_year && errors.release_year,
                      },
                      field: {
                        clearable: true,
                        onClear: () => setFieldValue('release_year', ''),
                      },
                    }}
                    minDate={dayjs().year(1950)}
                    maxDate={dayjs().year(dayjs().year())}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={formItemStyle}>
                <Field
                  name='poster'
                  as={TextField}
                  label='Poster URL'
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='Clear field'
                          onClick={() => setFieldValue('poster', '')}
                          edge='end'
                        >
                          <BackspaceIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.poster && Boolean(errors.poster)}
                  helperText={touched.poster && errors.poster}
                />
              </Box>
              <Box sx={formItemStyle}>
                <Field
                  name='trailer'
                  as={TextField}
                  label='Trailer URL (Youtube only)'
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='Clear field'
                          onClick={() => setFieldValue('trailer', '')}
                          edge='end'
                        >
                          <BackspaceIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.trailer && Boolean(errors.trailer)}
                  helperText={touched.trailer && errors.trailer}
                />
              </Box>
            </>
          )}

          {activeStep === 1 && (
            <Box sx={formItemStyle}>
              <FieldArray name='directors'>
                {({
                  push,
                  remove,
                  form: {
                    values: { directors },
                  },
                }) => (
                  <>
                    <Stack
                      component='fieldset'
                      form='movie-form'
                      spacing={2}
                      sx={fieldArrayStyle}
                    >
                      <Typography component='legend' variant='h6' gutterBottom>
                        Directors
                      </Typography>
                      {directors.map((director, index) => {
                        const filteredOptions = optionsForDirectors.filter(
                          (option) =>
                            !values.directors.includes(option.full_name) ||
                            option.full_name === director
                        );

                        return (
                          <Stack spacing={2} key={index} direction='row'>
                            <Field name={`directors[${index}]`}>
                              {({ field, form }) => {
                                const currentValue =
                                  optionsForDirectors.find(
                                    (option) => option.full_name === field.value
                                  ) || null;

                                return (
                                  <Autocomplete
                                    disablePortal
                                    id={`directors-${index}`}
                                    options={filteredOptions.sort(
                                      (a, b) =>
                                        -b.firstLetter.localeCompare(
                                          a.firstLetter
                                        )
                                    )}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) =>
                                      option.full_name
                                    }
                                    fullWidth
                                    value={currentValue}
                                    onChange={(event, value) =>
                                      form.setFieldValue(
                                        field.name,
                                        value ? value.full_name : ''
                                      )
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={
                                          form.touched[field.name] &&
                                          Boolean(form.errors[field.name])
                                        }
                                        helperText={
                                          form.touched[field.name] &&
                                          form.errors[field.name]
                                        }
                                      />
                                    )}
                                  />
                                );
                              }}
                            </Field>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </Stack>
                        );
                      })}
                      <Stack alignItems='center'>
                        <Button
                          variant='contained'
                          sx={addButtonFormStyle}
                          onClick={() => push('')}
                          startIcon={<GroupAddIcon />}
                          type='button'
                        >
                          Add director
                        </Button>
                      </Stack>
                    </Stack>
                  </>
                )}
              </FieldArray>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={formItemStyle}>
              <FieldArray name='actors'>
                {({
                  push,
                  remove,
                  form: {
                    values: { actors },
                  },
                }) => (
                  <>
                    <Stack
                      component='fieldset'
                      form='movie-form'
                      spacing={2}
                      sx={fieldArrayStyle}
                    >
                      <Typography component='legend' variant='h6' gutterBottom>
                        Actors
                      </Typography>
                      {actors.map((actor, index) => {
                        const filteredOptions = optionsForActors.filter(
                          (option) =>
                            !values.actors.includes(option.full_name) ||
                            option.full_name === actor
                        );

                        return (
                          <Stack spacing={2} key={index} direction='row'>
                            <Field name={`actors[${index}]`}>
                              {({ field, form }) => {
                                const currentValue =
                                  optionsForActors.find(
                                    (option) => option.full_name === field.value
                                  ) || null;

                                return (
                                  <Autocomplete
                                    disablePortal
                                    id={`actors-${index}`}
                                    options={filteredOptions.sort(
                                      (a, b) =>
                                        -b.firstLetter.localeCompare(
                                          a.firstLetter
                                        )
                                    )}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) =>
                                      option.full_name
                                    }
                                    fullWidth
                                    value={currentValue}
                                    onChange={(event, value) =>
                                      form.setFieldValue(
                                        field.name,
                                        value ? value.full_name : ''
                                      )
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={
                                          form.touched[field.name] &&
                                          Boolean(form.errors[field.name])
                                        }
                                        helperText={
                                          form.touched[field.name] &&
                                          form.errors[field.name]
                                        }
                                      />
                                    )}
                                  />
                                );
                              }}
                            </Field>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </Stack>
                        );
                      })}
                      <Stack alignItems='center'>
                        <Button
                          variant='contained'
                          sx={addButtonFormStyle}
                          onClick={() => push('')}
                          startIcon={<GroupAddIcon />}
                          type='button'
                        >
                          Add actor
                        </Button>
                      </Stack>
                    </Stack>
                  </>
                )}
              </FieldArray>
            </Box>
          )}

          {activeStep === 3 && (
            <Box sx={formItemStyle}>
              <FieldArray name='studios'>
                {({
                  push,
                  remove,
                  form: {
                    values: { studios },
                  },
                }) => (
                  <>
                    <Stack
                      component='fieldset'
                      form='movie-form'
                      spacing={2}
                      sx={fieldArrayStyle}
                    >
                      <Typography component='legend' variant='h6' gutterBottom>
                        Studios
                      </Typography>
                      {studios.map((studio, index) => {
                        const filteredOptions = optionsForStudios.filter(
                          (option) =>
                            !values.studios.includes(option.title) ||
                            option.title === studio
                        );

                        return (
                          <Stack spacing={2} key={index} direction='row'>
                            <Field name={`studios[${index}]`}>
                              {({ field, form }) => {
                                const currentValue =
                                  optionsForStudios.find(
                                    (option) => option.title === field.value
                                  ) || null;

                                return (
                                  <Autocomplete
                                    disablePortal
                                    id={`studios-${index}`}
                                    options={filteredOptions.sort(
                                      (a, b) =>
                                        -b.firstLetter.localeCompare(
                                          a.firstLetter
                                        )
                                    )}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => option.title}
                                    fullWidth
                                    value={currentValue}
                                    onChange={(event, value) =>
                                      form.setFieldValue(
                                        field.name,
                                        value ? value.title : ''
                                      )
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={
                                          form.touched[field.name] &&
                                          Boolean(form.errors[field.name])
                                        }
                                        helperText={
                                          form.touched[field.name] &&
                                          form.errors[field.name]
                                        }
                                      />
                                    )}
                                  />
                                );
                              }}
                            </Field>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </Stack>
                        );
                      })}
                      <Stack alignItems='center'>
                        <Button
                          variant='contained'
                          sx={addButtonFormStyle}
                          onClick={() => push('')}
                          startIcon={<DomainAddIcon />}
                          type='button'
                        >
                          Add studio
                        </Button>
                      </Stack>
                    </Stack>
                  </>
                )}
              </FieldArray>
            </Box>
          )}

          {activeStep === 4 && (
            <Box sx={formItemStyle}>
              <Field
                name='storyline'
                as={TextField}
                label='Brief storyline of the movie...'
                fullWidth
                multiline
                minRows={10}
                maxRows={15}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Clear field'
                        onClick={() => setFieldValue('storyline', '')}
                        edge='end'
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={touched.storyline && Boolean(errors.storyline)}
                helperText={touched.storyline && errors.storyline}
              />
            </Box>
          )}
        </Box>
        <Stack
          direction='row'
          justifyContent='center'
          spacing={1}
          sx={stackButtonFormStyle}
        >
          {activeStep === 0 ? (
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
          ) : (
            <Button
              variant='contained'
              sx={buttonFormStyle}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 ? (
            <Button
              variant='contained'
              sx={wideButtonFormStyle}
              onClick={(event) => handleNext(event, validateForm, setTouched)}
              startIcon={<ArrowForwardIcon />}
              type='button'
            >
              Next
            </Button>
          ) : (
            <Button
              type='submit'
              variant='contained'
              color='success'
              sx={wideButtonFormStyle}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          )}

          <Button
            type='reset'
            variant='contained'
            color='error'
            onClick={(event) => handleReset(event, resetForm)}
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
      initialValues={currentMovie || emptyMovie}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default MovieForm;
