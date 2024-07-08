import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
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
import { createStudio, updateStudio } from '../../store/slices/studiosSlice';
import { emptyStudio, locations } from '../../constants';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  stackButtonFormStyle,
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

  const sortedLocations = locations
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const schema = Yup.object().shape({
    title: Yup.string().required('Studio title is a required field'),
    location: Yup.string(),
    foundation_year: Yup.date(),
    logo: Yup.string().url('Invalid URL logo'),
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
              {({ field, form }) => {
                const currentValue =
                  sortedLocations.find(
                    (option) => option.title === field.value
                  ) || null;

                return (
                  <Autocomplete
                    disablePortal
                    id='location-select'
                    options={sortedLocations}
                    getOptionLabel={(option) => option.title}
                    fullWidth
                    value={currentValue}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value ? value.title : '')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Location'
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='foundation_year'
                label='Foundation year'
                value={
                  values.foundation_year
                    ? dayjs().year(values.foundation_year)
                    : null
                }
                views={['year']}
                onChange={(value) =>
                  setFieldValue('foundation_year', value ? value.year() : '')
                }
                sx={{ width: '330px' }}
                slotProps={{
                  textField: {
                    error:
                      touched.foundation_year &&
                      Boolean(errors.foundation_year),
                    helperText:
                      touched.foundation_year && errors.foundation_year,
                  },
                  field: {
                    clearable: true,
                    onClear: () => setFieldValue('foundation_year', ''),
                  },
                }}
                maxDate={dayjs().year(dayjs().year())}
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
            <Field
              name='about'
              as={TextField}
              label='General information about the studio...'
              value={values.about}
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
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
      initialValues={currentStudio || emptyStudio}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default StudioForm;
