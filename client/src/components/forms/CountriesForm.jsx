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

import SnackbarContext from '@/src/contexts/SnackbarContext';

import {
  createCountry,
  getCountryByUuid,
  updateCountry,
} from '@/src/services/countryService';
import { STRING_SCHEMA, TITLE_NAME_SCHEMA } from '@/src/services/itemService';
import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '@/src/services/styleService';

const emptyCountry = {
  uuid: null,
  title: '',
  flag: '',
};

function CountriesForm() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyCountry);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchCountry = useCallback(async () => {
    try {
      const country = await getCountryByUuid(uuid);
      setInitialValues(country);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setInitialValues(emptyCountry);
    } else {
      fetchCountry();
    }
  }, [uuid, fetchCountry]);

  const handleGoBack = useCallback(() => {
    if (uuid === ':uuid') {
      navigate(`/countries`);
    } else {
      navigate(`/countries/${uuid}`);
    }
  }, [uuid, navigate]);

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    flag: STRING_SCHEMA.url('Invalid flag image URL'),
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.uuid) {
          await updateCountry(values);
          showSnackbar('Country updated successfully!', 'success');
          navigate(`/countries/${uuid}`);
        } else {
          await createCountry(values);
          showSnackbar('Country created successfully!', 'success');
          navigate(`/countries`);
        }
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [uuid, navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='country-form'>
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
            label='Country title'
            name='title'
            value={values.title}
          />
        </Box>
        <Box sx={formItemStyle}>
          <Field
            fullWidth
            as={TextField}
            error={touched.flag && Boolean(errors.flag)}
            helperText={touched.flag && errors.flag}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('flag', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Country flag URL'
            name='flag'
            value={values.flag}
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

export default CountriesForm;
