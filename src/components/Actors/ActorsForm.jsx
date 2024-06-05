import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// ===================================
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// ===================================
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// ===================================
import {
  createActor,
  updateActor,
  deleteActor,
} from '../../store/slices/actorsSlice';
import { emptyActor } from '../../constants';
// ===================================
import { formItemStyle } from '../../services/styleService';
import { buttonFormStyle } from '../../services/styleService';

function ActorForm() {
  const dispatch = useDispatch();
  const actors = useSelector((state) => state.actorsList.actors);

  const { actorId } = useParams();
  const navigate = useNavigate();

  const currentActor = actors.find((actor) => Number(actor.id) === Number(actorId));

  const goBack = () => {
    navigate('/actors');
  };

  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is a required field'),
    nationality: Yup.string().required('Nationality is a required field'),
    image: Yup.string()
      .url('Invalid URL')
      .required('Image URL is a required field'),
    // birthYear: Yup.date().required('Birth year is a required field'),
    // movies: Yup.array().required('Movies is a required field'),
  });

  const onFormSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateActor(values));
    } else {
      dispatch(createActor(values));
      resetForm();
    }
  };

  const onActorDelete = () => {
    dispatch(deleteActor(currentActor.id));
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    console.log(values);
    return (
      <Form id='actor-form'>
        <Box
          sx={{
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <Box sx={formItemStyle}>
            <Field
              name='fullName'
              as={TextField}
              label='Full name'
              variant='filled'
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
              <Box components={['DatePicker']}>
                <DatePicker
                  name='birthYear'
                  label='Birth year'
                  // value={values.birthYear}
                  views={['year']}
                />
              </Box>
            </LocalizationProvider>
          </Box>
          <Box sx={formItemStyle}>
            <Field
              name='nationality'
              as={TextField}
              label='Nationality'
              variant='filled'
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
              variant='filled'
              fullWidth
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />
            <IconButton onClick={() => setFieldValue('image', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>

          <Box sx={formItemStyle}>
            <Field
              name='movies'
              as={TextField}
              label='Movies'
              variant='filled'
              fullWidth
              error={touched.movies && Boolean(errors.movies)}
              helperText={touched.movies && errors.movies}
            />
            <IconButton onClick={() => setFieldValue('movies', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>

          <Stack direction='row' justifyContent='center' spacing={1}>
            <Button
              type='submit'
              variant='contained'
              color='success'
              style={buttonFormStyle}
            >
              Save
            </Button>

            <Button
              type='button'
              variant='contained'
              color='error'
              style={buttonFormStyle}
              onClick={onActorDelete}
            >
              Delete
            </Button>

            <Button
              type='button'
              variant='contained'
              style={buttonFormStyle}
              onClick={goBack}
            >
              Go back
            </Button>
          </Stack>
        </Box>
      </Form>
    );
  };

  return (
    <>
      <Formik
        initialValues={currentActor ? currentActor : emptyActor}
        onSubmit={onFormSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    </>
  );
}

export default ActorForm;
