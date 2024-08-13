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
import { SERVICES_ENTITY_NAME, emptyGenre } from '../../constants';
// =============================================
import { TITLE_NAME_SCHEMA, STRING_SCHEMA } from '../../services/itemService';
// =============================================
import {
  getGenreById,
  createGenre,
  patchGenre,
} from '../../services/genreService';
// =============================================
import {
  formStyle,
  formItemStyle,
  buttonFormStyle,
  wideButtonFormStyle,
  stackButtonFormStyle,
} from '../../services/styleService';

function GenreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyGenre);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchGenre = useCallback(async () => {
    try {
      const genre = await getGenreById(id);
      setInitialValues(genre);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setInitialValues(emptyGenre);
    } else {
      fetchGenre();
    }
  }, [id, fetchGenre]);

  const goBack = () => navigate(`/${SERVICES_ENTITY_NAME}`);

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    logo: STRING_SCHEMA.url('Invalid genre logo URL'),
  });

  const onFormSubmit = async (values) => {
    try {
      if (values.id) {
        await patchGenre(values);
        showSnackbar('Genre updated successfully!', 'success');
      } else {
        await createGenre(values);
        showSnackbar('Genre created successfully!', 'success');
      }
      navigate(`/${SERVICES_ENTITY_NAME}`);
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const renderForm = ({ values, errors, touched, setFieldValue }) => {
    return (
      <Form id='genre-form'>
        <Box sx={formStyle}>
          <Box sx={formItemStyle}>
            <Field
              name='title'
              as={TextField}
              label='Genre title'
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
            <Field
              name='logo'
              as={TextField}
              label='Genre logo URL'
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

export default GenreForm;
