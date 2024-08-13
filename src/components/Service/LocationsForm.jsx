import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import SaveIcon from '@mui/icons-material/Save';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  SERVICES_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  emptyLocation,
} from '../../constants';
// =============================================
import { TITLE_NAME_SCHEMA, STRING_SCHEMA } from '../../services/itemService';
// =============================================
import {
  getLocationById,
  createLocation,
  patchLocation,
} from '../../services/locationService';
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

function LocationsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyLocation);

  const { data: countries } = useFetchData(`/${COUNTRIES_ENTITY_NAME}`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchLocation = useCallback(async () => {
    try {
      const location = await getLocationById(id);
      setInitialValues(location);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setInitialValues(emptyLocation);
    } else {
      fetchLocation();
    }
  }, [id, fetchLocation]);

  const goBack = () => navigate(`/${SERVICES_ENTITY_NAME}`);

  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    country: STRING_SCHEMA.required('Input is a required field'),
    coat_of_arms: STRING_SCHEMA.url('Invalid city coat of arms URL'),
  });

  const onFormSubmit = async (values) => {
    try {
      if (values.id) {
        await patchLocation(values);
        showSnackbar('Location updated successfully!', 'success');
      } else {
        await createLocation(values);
        showSnackbar('Location created successfully!', 'success');
      }
      navigate(`/${SERVICES_ENTITY_NAME}`);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <Form id='location-form'>
        <Box sx={formStyle}>
          <Box sx={formItemStyle}>
            <Field
              name='title'
              as={TextField}
              label='City name'
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
              name='country'
              options={sortedCountries}
              getOptionLabel={(option) => option.title}
              label='Country'
              setFieldValue={setFieldValue}
            />
          </Box>

          <Box sx={formItemStyle}>
            <Field
              name='coat_of_arms'
              as={TextField}
              label='City coat of arms URL'
              value={values.coat_of_arms}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear field'
                      onClick={() => setFieldValue('coat_of_arms', '')}
                      edge='end'
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.coat_of_arms && Boolean(errors.coat_of_arms)}
              helperText={touched.coat_of_arms && errors.coat_of_arms}
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

export default LocationsForm;
