import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
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
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  STUDIOS_ENTITY_NAME,
  LOCATIONS_ENTITY_NAME,
  emptyStudio,
} from '../../constants';
// =============================================
import {
  TITLE_NAME_SCHEMA,
  STRING_SCHEMA,
  DATE_SCHEMA,
} from '../../services/itemService';
// =============================================
import {
  getStudioById,
  createStudio,
  patchStudio,
} from '../../services/studioService';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';
// =============================================
import useFetchData from '../../hooks/useFetchData';
// =============================================
import BasicAutocompleteField from '../Autocomplete/BasicAutocompleteField';

function StudioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyStudio);

  const { data: locations } = useFetchData(`/${LOCATIONS_ENTITY_NAME}`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchStudio = useCallback(async () => {
    try {
      const studio = await getStudioById(id);
      setInitialValues(studio);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setInitialValues(emptyStudio);
    } else {
      fetchStudio();
    }
  }, [id, fetchStudio]);

  const goBack = () => {
    if (id !== ':id') {
      navigate(`/${STUDIOS_ENTITY_NAME}/${id}`);
    } else {
      navigate(`/${STUDIOS_ENTITY_NAME}`);
    }
  };

  const sortedLocations = locations
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    location: STRING_SCHEMA,
    foundation_year: DATE_SCHEMA,
    logo: STRING_SCHEMA.url('Invalid logo URL'),
    about: STRING_SCHEMA,
  });

  const onFormSubmit = async (values) => {
    try {
      if (values.id) {
        await patchStudio(values);
        showSnackbar('Studio updated successfully!', 'success');
        navigate(`/${STUDIOS_ENTITY_NAME}/${id}`);
      } else {
        await createStudio(values);
        showSnackbar('Studio created successfully!', 'success');
        navigate(`/${STUDIOS_ENTITY_NAME}`);
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
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
            <BasicAutocompleteField
              name='location'
              options={sortedLocations}
              getOptionLabel={(option) => option.title}
              label='Location'
              setFieldValue={setFieldValue}
            />

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
              id='about-textarea'
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default StudioForm;
