import { useEffect } from 'react';
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
import { Typography } from '@mui/material';
// =============================================
import {
  getAllDirectors,
  createDirector,
  updateDirector,
} from '../../store/slices/directorsSlice';
import { emptyDirector } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
} from '../../services/styleService';

function DirectorForm() {
  const dispatch = useDispatch();
  const directors = useSelector((state) => state.directorsList.directors);

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

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

  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is a required field'),
    birthYear: Yup.date(),
    nationality: Yup.string(),
    image: Yup.string().url('Invalid URL image'),
    movies: Yup.array(),
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
              name='fullName'
              as={TextField}
              label='Full name'
              value={values.fullName}
              fullWidth
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
            <IconButton onClick={() => setFieldValue('fullName', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={formItemStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='birthYear'
                label='Birth year'
                value={values.birthYear ? dayjs().year(values.birthYear) : null}
                views={['year']}
                onChange={(value) =>
                  setFieldValue('birthYear', value ? value.year() : '')
                }
                sx={{ width: '400px' }}
                slotProps={{
                  textField: {
                    error: touched.birthYear && Boolean(errors.birthYear),
                    helperText: touched.birthYear && errors.birthYear,
                  },
                }}
              />
            </LocalizationProvider>
            <IconButton onClick={() => setFieldValue('birthYear', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='nationality'
              as={TextField}
              label='Nationality'
              fullWidth
              error={touched.nationality && Boolean(errors.nationality)}
              helperText={touched.nationality && errors.nationality}
            />
            <IconButton onClick={() => setFieldValue('nationality', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='image'
              as={TextField}
              label='Image URL'
              fullWidth
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />
            <IconButton onClick={() => setFieldValue('image', '')}>
              <BackspaceIcon />
            </IconButton>
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
                    form='director-form'
                    spacing={2}
                    sx={{
                      width: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      paddingBottom: '10px',
                      borderRadius: '5px',
                    }}
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
          <Stack direction='row' justifyContent='center' spacing={1}>
            <Button
              type='submit'
              variant='contained'
              color='success'
              style={buttonFormStyle}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>

            <Button
              type='reset'
              variant='contained'
              color='error'
              style={buttonFormStyle}
              startIcon={<ClearAllIcon />}
            >
              Reset
            </Button>

            <Button
              type='button'
              variant='contained'
              style={buttonFormStyle}
              onClick={goBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentDirector ? currentDirector : emptyDirector}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default DirectorForm;
