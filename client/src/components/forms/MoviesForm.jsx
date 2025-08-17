import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getYear } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SaveIcon from '@mui/icons-material/Save';

import SnackbarContext from '@/src/contexts/SnackbarContext';
import useFetchData from '@/src/hooks/useFetchData';

import {
  ARRAY_SCHEMA,
  DATE_SCHEMA,
  STRING_SCHEMA,
  TITLE_NAME_SCHEMA,
} from '@/src/services/itemService';
import {
  createMovie,
  getMovieByUuid,
  updateMovie,
} from '@/src/services/movieService';
import {
  addButtonFormStyle,
  buttonFormStyle,
  fieldArrayStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '@/src/services/styleService';

import BasicAutocompleteField from '@/src/components/forms/Autocomplete/BasicAutocompleteField';
import FieldArrayAutocompleteField from '@/src/components/forms/Autocomplete/FieldArrayAutocompleteField';

const emptyMovie = {
  uuid: null,
  title: '',
  genre: '',
  releaseYear: '',
  poster: '',
  trailer: '',
  directors: [''],
  actors: [''],
  studios: [''],
  storyline: '',
};

function MovieForm() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(emptyMovie);
  const [activeStep, setActiveStep] = useState(0);

  const { data: actors } = useFetchData(`/actors`);
  const { data: directors } = useFetchData(`/directors`);
  const { data: studios } = useFetchData(`/studios`);
  const { data: genres } = useFetchData(`/genres`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchMovie = useCallback(async () => {
    try {
      const movie = await getMovieByUuid(uuid);
      setInitialValues({
        ...movie,
        genre:
          typeof movie.genre === 'object' && movie.genre !== null
            ? movie.genre.title
            : movie.genre,
      });
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setInitialValues(emptyMovie);
    } else {
      fetchMovie();
    }
  }, [uuid, fetchMovie]);

  const handleGoBack = useCallback(() => {
    if (uuid === ':uuid') {
      navigate(`/movies`);
    } else {
      navigate(`/movies/${uuid}`);
    }
  }, [uuid, navigate]);

  const optionsForEntities = (entities, key) =>
    entities.length > 1
      ? entities.map((option) => {
          const firstLetter = option[key][0].toUpperCase();
          return {
            firstLetter: /\d/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
          };
        })
      : [];

  const optionsForActors = optionsForEntities(actors, 'fullName');
  const optionsForDirectors = optionsForEntities(directors, 'fullName');
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
    releaseYear: DATE_SCHEMA,
    poster: STRING_SCHEMA.url('Invalid poster URL'),
    trailer: STRING_SCHEMA.url('Invalid Youtube URL').matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})$/,
      'Example: https://www.youtube.com/watch?v=a-bcdefghij'
    ),
    directors: ARRAY_SCHEMA,
    actors: ARRAY_SCHEMA,
    studios: ARRAY_SCHEMA,
    storyline: STRING_SCHEMA,
  });

  const handleSubmit = useCallback(
    async (values) => {
      const cleanValues = {
        ...values,
        directors: values.directors
          .filter((v) => v)
          .map((v) =>
            typeof v === 'object' ? v.fullName || v.title || '' : String(v)
          ),
        actors: values.actors
          .filter((v) => v)
          .map((v) =>
            typeof v === 'object' ? v.fullName || v.title || '' : String(v)
          ),
        studios: values.studios
          .filter((v) => v)
          .map((v) =>
            typeof v === 'object' ? v.title || v.fullName || '' : String(v)
          ),
      };

      try {
        if (cleanValues.uuid) {
          await updateMovie(cleanValues);
          showSnackbar('Movie updated successfully!', 'success');
          navigate(`/movies/${uuid}`);
        } else {
          await createMovie(cleanValues);
          showSnackbar('Movie created successfully!', 'success');
          navigate(`/movies`);
        }
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [uuid, navigate, showSnackbar]
  );

  const renderForm = ({
    values,
    errors,
    touched,
    setFieldValue,
    validateForm,
    setTouched,
    resetForm,
  }) => (
    <Form id='movie-form'>
      <Box sx={formStyle}>
        <Stepper alternativeLabel activeStep={activeStep}>
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
                fullWidth
                as={TextField}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Clear field'
                        edge='end'
                        onClick={() => setFieldValue('title', '')}
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label='Movie title'
                name='title'
                value={values.title}
              />
            </Box>
            <Box sx={formItemStyle}>
              <BasicAutocompleteField
                getOptionLabel={(option) => option.title}
                label='Genre movie'
                name='genre'
                options={sortedGenres}
                setFieldValue={setFieldValue}
              />

              <LocalizationProvider
                adapterLocale={enGB}
                dateAdapter={AdapterDateFns}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Release year'
                    maxDate={new Date(getYear(new Date()), 11, 31)}
                    minDate={new Date(1900, 0, 1)}
                    name='date'
                    slotProps={{
                      textField: {
                        error:
                          touched.releaseYear && Boolean(errors.releaseYear),
                        helperText: touched.releaseYear && errors.releaseYear,
                      },
                      field: {
                        clearable: true,
                        onClear: () => setFieldValue('releaseYear', ''),
                      },
                    }}
                    sx={{ width: '330px' }}
                    value={
                      values.releaseYear
                        ? new Date(values.releaseYear, 0, 1)
                        : null
                    }
                    views={['year']}
                    onChange={(value) =>
                      setFieldValue('releaseYear', value ? getYear(value) : '')
                    }
                  />
                </LocalizationProvider>
              </LocalizationProvider>
            </Box>
            <Box sx={formItemStyle}>
              <Field
                fullWidth
                as={TextField}
                error={touched.poster && Boolean(errors.poster)}
                helperText={touched.poster && errors.poster}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Clear field'
                        edge='end'
                        onClick={() => setFieldValue('poster', '')}
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label='Poster URL'
                name='poster'
              />
            </Box>
            <Box sx={formItemStyle}>
              <Field
                fullWidth
                as={TextField}
                error={touched.trailer && Boolean(errors.trailer)}
                helperText={touched.trailer && errors.trailer}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Clear field'
                        edge='end'
                        onClick={() => setFieldValue('trailer', '')}
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label='Trailer URL (Youtube only)'
                name='trailer'
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
                  <Typography gutterBottom component='legend' variant='h6'>
                    Directors
                  </Typography>
                  {directors.map((director, index) => {
                    const filteredOptions = optionsForDirectors.filter(
                      (option) => {
                        const directorName =
                          typeof director === 'string'
                            ? director
                            : director.fullName;

                        const directorNamesInValues = values.directors.map(
                          (d) => (typeof d === 'string' ? d : d.fullName)
                        );

                        return (
                          !directorNamesInValues.includes(option.fullName) ||
                          option.fullName === directorName
                        );
                      }
                    );

                    return (
                      <Stack key={index} direction='row' spacing={2}>
                        <FieldArrayAutocompleteField
                          getOptionLabel={(option) => option.fullName}
                          groupBy={(option) => option.firstLetter}
                          id={`directors-${index}`}
                          name={`directors[${index}]`}
                          options={filteredOptions.sort(
                            (a, b) =>
                              -b.firstLetter.localeCompare(a.firstLetter)
                          )}
                        />
                        <IconButton onClick={() => remove(index)}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    );
                  })}
                  <Stack alignItems='center'>
                    <Button
                      startIcon={<GroupAddIcon />}
                      sx={addButtonFormStyle}
                      type='button'
                      variant='contained'
                      onClick={() => push('')}
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
                  <Typography gutterBottom component='legend' variant='h6'>
                    Actors
                  </Typography>
                  {actors.map((actor, index) => {
                    const filteredOptions = optionsForActors.filter(
                      (option) => {
                        const actorName =
                          typeof actor === 'string' ? actor : actor.fullName;

                        const actorNamesInValues = values.actors.map((a) =>
                          typeof a === 'string' ? a : a.fullName
                        );

                        return (
                          !actorNamesInValues.includes(option.fullName) ||
                          option.fullName === actorName
                        );
                      }
                    );

                    return (
                      <Stack key={index} direction='row' spacing={2}>
                        <FieldArrayAutocompleteField
                          getOptionLabel={(option) => option.fullName}
                          groupBy={(option) => option.firstLetter}
                          id={`actors-${index}`}
                          name={`actors[${index}]`}
                          options={filteredOptions.sort(
                            (a, b) =>
                              -b.firstLetter.localeCompare(a.firstLetter)
                          )}
                        />
                        <IconButton onClick={() => remove(index)}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    );
                  })}
                  <Stack alignItems='center'>
                    <Button
                      startIcon={<GroupAddIcon />}
                      sx={addButtonFormStyle}
                      type='button'
                      variant='contained'
                      onClick={() => push('')}
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
                  <Typography gutterBottom component='legend' variant='h6'>
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
                      <Stack key={index} direction='row' spacing={2}>
                        <FieldArrayAutocompleteField
                          getOptionLabel={(option) => option.title}
                          groupBy={(option) => option.firstLetter}
                          id={`studios-${index}`}
                          name={`studios[${index}]`}
                          options={filteredOptions.sort(
                            (a, b) =>
                              -b.firstLetter.localeCompare(a.firstLetter)
                          )}
                        />
                        <IconButton onClick={() => remove(index)}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    );
                  })}
                  <Stack alignItems='center'>
                    <Button
                      startIcon={<DomainAddIcon />}
                      sx={addButtonFormStyle}
                      type='button'
                      variant='contained'
                      onClick={() => push('')}
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
              fullWidth
              multiline
              as={TextField}
              error={touched.storyline && Boolean(errors.storyline)}
              helperText={touched.storyline && errors.storyline}
              id='storyline-textarea'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      edge='end'
                      onClick={() => setFieldValue('storyline', '')}
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label='Brief storyline of the movie...'
              maxRows={15}
              minRows={10}
              name='storyline'
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
            color='warning'
            startIcon={<ArrowBackIcon />}
            sx={buttonFormStyle}
            type='button'
            variant='contained'
            onClick={handleGoBack}
          >
            Return
          </Button>
        ) : (
          <Button
            startIcon={<ArrowBackIcon />}
            sx={buttonFormStyle}
            variant='contained'
            onClick={handleBack}
          >
            Back
          </Button>
        )}

        {activeStep < steps.length - 1 ? (
          <Button
            startIcon={<ArrowForwardIcon />}
            sx={wideButtonFormStyle}
            type='button'
            variant='contained'
            onClick={(event) => handleNext(event, validateForm, setTouched)}
          >
            Next
          </Button>
        ) : (
          <Button
            color='success'
            startIcon={<SaveIcon />}
            sx={wideButtonFormStyle}
            type='submit'
            variant='contained'
          >
            Save
          </Button>
        )}

        <Button
          color='error'
          startIcon={<ClearAllIcon />}
          sx={buttonFormStyle}
          type='reset'
          variant='contained'
          onClick={(event) => handleReset(event, resetForm)}
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
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default MovieForm;
