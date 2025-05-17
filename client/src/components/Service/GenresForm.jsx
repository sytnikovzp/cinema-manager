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

import { emptyGenre } from '../../constants';

import {
  createGenre,
  getGenreById,
  updateGenre,
} from '../../services/genreService';
import { STRING_SCHEMA, TITLE_NAME_SCHEMA } from '../../services/itemService';
import {
  buttonFormStyle,
  formItemStyle,
  formStyle,
  stackButtonFormStyle,
  wideButtonFormStyle,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';

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
    if (id === ':id') {
      setInitialValues(emptyGenre);
    } else {
      fetchGenre();
    }
  }, [id, fetchGenre]);

  const handleGoBack = useCallback(() => navigate(`/services`), [navigate]);

  const validationSchema = Yup.object().shape({
    title: TITLE_NAME_SCHEMA,
    logo: STRING_SCHEMA.url('Invalid genre logo URL'),
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        if (values.id) {
          await updateGenre(values);
          showSnackbar('Genre updated successfully!', 'success');
        } else {
          await createGenre(values);
          showSnackbar('Genre created successfully!', 'success');
        }
        navigate(`/services`);
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [navigate, showSnackbar]
  );

  const renderForm = ({ values, errors, touched, setFieldValue }) => (
    <Form id='genre-form'>
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
            label='Genre title'
            name='title'
            value={values.title}
          />
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
            label='Genre logo URL'
            name='logo'
            value={values.logo}
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

export default GenreForm;
