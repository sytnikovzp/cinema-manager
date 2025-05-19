import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveIcon from '@mui/icons-material/Save';

import { emptyLocation } from '../../constants';
import useFetchData from '../../hooks/useFetchData';

import { STRING_SCHEMA, TITLE_NAME_SCHEMA } from '../../services/itemService';
import {
  createLocation,
  getLocationByUuid,
  updateLocation,
} from '../../services/locationService';
import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import BasicAutocompleteField from '../Autocomplete/BasicAutocompleteField';

function LocationsForm() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyLocation);

  const { data: countries } = useFetchData(`/countries`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchLocation = useCallback(async () => {
    try {
      const location = await getLocationByUuid(uuid);
      setInitialValues(location);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setInitialValues(emptyLocation);
    } else {
      fetchLocation();
    }
  }, [uuid, fetchLocation]);

  const handleGoBack = useCallback(() => navigate(`/services`), [navigate]);

  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    country: STRING_SCHEMA.required('Input is a required field'),
    coatOfArms: STRING_SCHEMA.url('Invalid city coat of arms URL'),
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.uuid) {
          await updateLocation(values);
          showSnackbar('Location updated successfully!', 'success');
        } else {
          await createLocation(values);
          showSnackbar('Location created successfully!', 'success');
        }
        navigate(`/services`);
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='location-form'>
      <Box sx={formStyle}>
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
            label='City name'
            name='title'
            value={values.title}
          />
        </Box>

        <Box sx={formItemStyle}>
          <BasicAutocompleteField
            getOptionLabel={(option) => option.title}
            label='Country'
            name='country'
            options={sortedCountries}
            setFieldValue={setFieldValue}
          />
        </Box>

        <Box sx={formItemStyle}>
          <Field
            fullWidth
            as={TextField}
            error={touched.coatOfArms && Boolean(errors.coatOfArms)}
            helperText={touched.coatOfArms && errors.coatOfArms}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('coatOfArms', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='City coat of arms URL'
            name='coatOfArms'
            value={values.coatOfArms}
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
          color='warning'
          startIcon={<ArrowBackIcon />}
          sx={buttonFormStyle}
          type='button'
          variant='contained'
          onClick={handleGoBack}
        >
          Return
        </Button>

        <Button
          color='success'
          startIcon={<SaveIcon />}
          sx={wideButtonFormStyle}
          type='submit'
          variant='contained'
        >
          Save
        </Button>

        <Button
          color='error'
          startIcon={<ClearAllIcon />}
          sx={buttonFormStyle}
          type='reset'
          variant='contained'
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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default LocationsForm;
