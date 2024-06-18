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
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
// =============================================
import { createActor, updateActor } from '../../store/slices/actorsSlice';
import { emptyActor, nationalities } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  fieldArrayStyle,
  buttonFormStyle,
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
    birthYear: Yup.date(),
    nationality: Yup.string(),
    image: Yup.string().url('Invalid URL image'),
    movies: Yup.array(),
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='birthYear'
                label='Birth year'
                value={values.birthYear ? dayjs().year(values.birthYear) : null}
                views={['year']}
                onChange={(value) =>
                  setFieldValue('birthYear', value ? value.year() : '')
                }
                sx={{ width: '250px' }}
                slotProps={{
                  textField: {
                    error: touched.birthYear && Boolean(errors.birthYear),
                    helperText: touched.birthYear && errors.birthYear,
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
                    form='actor-form'
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
              name='biography'
              as={TextField}
              label='Brief biography of the actor...'
              value={values.biography}
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
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
              sx={buttonFormStyle}
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
