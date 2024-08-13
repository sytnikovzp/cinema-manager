import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
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
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  ACTORS_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
  GENRES_ENTITY_NAME,
  emptyMovie,
} from '../../constants';
// =============================================
import {
  TITLE_NAME_SCHEMA,
  STRING_SCHEMA,
  DATE_SCHEMA,
  ARRAY_SCHEMA,
} from '../../services/itemService';
// =============================================
import {
  getMovieById,
  createMovie,
  patchMovie,
} from '../../services/movieService';
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
// =============================================
import useFetchData from '../../hooks/useFetchData';
// =============================================
import BasicAutocompleteField from '../Autocomplete/BasicAutocompleteField';
import FieldArrayAutocompleteField from '../Autocomplete/FieldArrayAutocompleteField';

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(emptyMovie);
  const [activeStep, setActiveStep] = useState(0);

  const { data: actors } = useFetchData(`/${ACTORS_ENTITY_NAME}`);
  const { data: directors } = useFetchData(`/${DIRECTORS_ENTITY_NAME}`);
  const { data: studios } = useFetchData(`/${STUDIOS_ENTITY_NAME}`);
  const { data: genres } = useFetchData(`/${GENRES_ENTITY_NAME}`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchMovie = useCallback(async () => {
    try {
      const movie = await getMovieById(id);
      setInitialValues(movie);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setInitialValues(emptyMovie);
    } else {
      fetchMovie();
    }
  }, [id, fetchMovie]);

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/${MOVIES_ENTITY_NAME}/${id}`);
    } else {
      navigate(`/${MOVIES_ENTITY_NAME}`);
    }
  };

  const optionsForEntities = (entities, key) =>
    entities.length > 1
      ? entities.map((option) => {
          const firstLetter = option[key][0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        })
      : [];

  const optionsForActors = optionsForEntities(actors, 'full_name');
  const optionsForDirectors = optionsForEntities(directors, 'full_name');
  const optionsForStudios = optionsForEntities(studios, 'title');

  const sortedGenres = genres
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const steps = ['General', 'Directors', 'Actors', 'Studios', 'Storyline'];

  const handleNext = async (event, validateForm, setTouched) => {
    event.preventDefault();
    setTouched({ title: true, poster: true, trailer: true });
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

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    genre: STRING_SCHEMA,
    release_year: DATE_SCHEMA,
    poster: STRING_SCHEMA.url('Invalid poster URL'),
    trailer: STRING_SCHEMA.url('Invalid Youtube URL').matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
      'Example: https://www.youtube.com/watch?v=a-bcdefghij'
    ),
    directors: ARRAY_SCHEMA,
    actors: ARRAY_SCHEMA,
    studios: ARRAY_SCHEMA,
    storyline: STRING_SCHEMA,
  });

  const onFormSubmit = async (values) => {
    const cleanValues = {
      ...values,
      directors: values.directors
        .filter((v) => v)
        .map((v) =>
          typeof v === 'object' ? v.full_name || v.title || '' : String(v)
        ),
      actors: values.actors
        .filter((v) => v)
        .map((v) =>
          typeof v === 'object' ? v.full_name || v.title || '' : String(v)
        ),
      studios: values.studios
        .filter((v) => v)
        .map((v) =>
          typeof v === 'object' ? v.title || v.full_name || '' : String(v)
        ),
    };

    try {
      if (cleanValues.id) {
        await patchMovie(cleanValues);
        showSnackbar('Movie updated successfully!', 'success');
        navigate(`/${MOVIES_ENTITY_NAME}/${id}`);
      } else {
        await createMovie(cleanValues);
        showSnackbar('Movie created successfully!', 'success');
        navigate(`/${MOVIES_ENTITY_NAME}`);
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
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
                <BasicAutocompleteField
                  name='genre'
                  options={sortedGenres}
                  getOptionLabel={(option) => option.title}
                  label='Genre movie'
                  setFieldValue={setFieldValue}
                />

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
                        (option) => {
                          const directorName =
                            typeof director === 'string'
                              ? director
                              : director.full_name;

                          const directorNamesInValues = values.directors.map(
                            (d) => (typeof d === 'string' ? d : d.full_name)
                          );

                          return (
                            !directorNamesInValues.includes(option.full_name) ||
                            option.full_name === directorName
                          );
                        }
                      );

                      return (
                        <Stack spacing={2} key={index} direction='row'>
                          <FieldArrayAutocompleteField
                            id={`directors-${index}`}
                            name={`directors[${index}]`}
                            options={filteredOptions.sort(
                              (a, b) =>
                                -b.firstLetter.localeCompare(a.firstLetter)
                            )}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.full_name}
                          />
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
                        (option) => {
                          const actorName =
                            typeof actor === 'string' ? actor : actor.full_name;

                          const actorNamesInValues = values.actors.map((a) =>
                            typeof a === 'string' ? a : a.full_name
                          );

                          return (
                            !actorNamesInValues.includes(option.full_name) ||
                            option.full_name === actorName
                          );
                        }
                      );

                      return (
                        <Stack spacing={2} key={index} direction='row'>
                          <FieldArrayAutocompleteField
                            id={`actors-${index}`}
                            name={`actors[${index}]`}
                            options={filteredOptions.sort(
                              (a, b) =>
                                -b.firstLetter.localeCompare(a.firstLetter)
                            )}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.full_name}
                          />
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
                        (option) => {
                          const studioName =
                            typeof studio === 'string' ? studio : studio.title;

                          const studioNamesInValues = values.studios.map((s) =>
                            typeof s === 'string' ? s : s.title
                          );

                          return (
                            !studioNamesInValues.includes(option.title) ||
                            option.title === studioName
                          );
                        }
                      );

                      return (
                        <Stack spacing={2} key={index} direction='row'>
                          <FieldArrayAutocompleteField
                            id={`studios-${index}`}
                            name={`studios[${index}]`}
                            options={filteredOptions.sort(
                              (a, b) =>
                                -b.firstLetter.localeCompare(a.firstLetter)
                            )}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.title}
                          />
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
                )}
              </FieldArray>
            </Box>
          )}

          {activeStep === 4 && (
            <Box sx={formItemStyle}>
              <Field
                name='storyline'
                as={TextField}
                id='storyline-textarea'
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
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
    >
      {renderForm}
    </Formik>
  );
}

export default MovieForm;
