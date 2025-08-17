import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enGB } from 'date-fns/locale';
import { Field, Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveIcon from '@mui/icons-material/Save';

import SnackbarContext from '@/src/contexts/SnackbarContext';
import { STUDIO_VALIDATION_SCHEME } from '@/src/utils/validationSchemes';
import useFetchData from '@/src/hooks/useFetchData';

import {
  createStudio,
  getStudioByUuid,
  updateStudio,
} from '@/src/services/studioService';

import BasicAutocompleteField from '@/src/components/forms/Autocomplete/BasicAutocompleteField';

import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '@/src/styles';

const emptyStudio = {
  uuid: null,
  title: '',
  location: '',
  foundationYear: '',
  logo: '',
  about: '',
};

function StudioForm() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyStudio);

  const { data: locations } = useFetchData(`/locations`);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchStudio = useCallback(async () => {
    try {
      const studio = await getStudioByUuid(uuid);
      setInitialValues({
        ...studio,
        location:
          typeof studio.location === 'object'
            ? studio.location.title
            : studio.location,
      });
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setInitialValues(emptyStudio);
    } else {
      fetchStudio();
    }
  }, [uuid, fetchStudio]);

  const handleGoBack = useCallback(() => {
    if (uuid === ':uuid') {
      navigate(`/studios`);
    } else {
      navigate(`/studios/${uuid}`);
    }
  }, [uuid, navigate]);

  const sortedLocations = locations
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.uuid) {
          await updateStudio(values);
          showSnackbar('Studio updated successfully!', 'success');
          navigate(`/studios/${uuid}`);
        } else {
          await createStudio(values);
          showSnackbar('Studio created successfully!', 'success');
          navigate(`/studios`);
        }
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [uuid, navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='studio-form'>
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
            label='Studio title'
            name='title'
            value={values.title}
          />
        </Box>
        <Box sx={formItemStyle}>
          <BasicAutocompleteField
            getOptionLabel={(option) => option.title}
            label='Location'
            name='location'
            options={sortedLocations}
            setFieldValue={setFieldValue}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
            <DatePicker
              label='Foundation year'
              maxDate={new Date()}
              name='foundationYear'
              slotProps={{
                textField: {
                  error:
                    touched.foundationYear && Boolean(errors.foundationYear),
                  helperText: touched.foundationYear && errors.foundationYear,
                },
                field: {
                  clearable: true,
                  onClear: () => setFieldValue('foundationYear', ''),
                },
              }}
              sx={{ width: '330px' }}
              value={
                values.foundationYear
                  ? new Date(values.foundationYear, 0, 1)
                  : null
              }
              views={['year']}
              onChange={(value) =>
                setFieldValue(
                  'foundationYear',
                  value ? value.getFullYear() : ''
                )
              }
            />
          </LocalizationProvider>
        </Box>
        <Box sx={formItemStyle}>
          <Field
            fullWidth
            as={TextField}
            error={touched.logo && Boolean(errors.logo)}
            helperText={touched.logo && errors.logo}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('logo', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Logo URL'
            name='logo'
            value={values.logo}
          />
        </Box>
        <Box sx={formItemStyle}>
          <Field
            fullWidth
            multiline
            as={TextField}
            error={touched.about && Boolean(errors.about)}
            helperText={touched.about && errors.about}
            id='about-textarea'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Clear field'
                    edge='end'
                    onClick={() => setFieldValue('about', '')}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='General information about the studio...'
            maxRows={6}
            minRows={4}
            name='about'
            value={values.about}
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
      validationSchema={STUDIO_VALIDATION_SCHEME}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default StudioForm;
