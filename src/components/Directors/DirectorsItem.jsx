import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
// =============================================
import {
  scrollBoxStyle,
  buttonMainStyle,
  itemComponentBoxMainStyle,
  itemComponentBoxSecondaryStyle,
  itemInformationBoxStyle,
} from '../../services/styleService';
// =============================================
import { emptyDirector } from '../../constants';
import { resetStatus } from '../../store/slices/directorsSlice';
// =============================================
import useSnackbar from '../../hooks';

function DirectorsItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/directors');
  };

  const directors = useSelector((state) => state.directorsList.directors);
  const status = useSelector((state) => state.directorsList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (currentStatus && currentStatus !== prevStatus) {
      const severity = currentStatus.toLowerCase().includes('success')
        ? 'success'
        : 'error';
      showSnackbar(currentStatus, severity);
    }

    prevStatusRef.current = currentStatus;
  }, [status, showSnackbar]);

  const director = directors.find(
    (director) => Number(director.id) === Number(id)
  );

  const currentDirector = director ? director : emptyDirector;

  const formattedMovies = currentDirector.movies
    ? currentDirector.movies.join(', ')
    : 'No movies available';

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          type='button'
          variant='contained'
          color='info'
          sx={buttonMainStyle}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
        </Button>

        <Button
          type='button'
          variant='contained'
          color='warning'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/directors/new/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to='/directors/new'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<GroupAddIcon />}
        >
          Add director
        </Button>
      </Stack>

      <Divider />

      <Box sx={scrollBoxStyle}>
        <Box sx={itemComponentBoxMainStyle}>
          <Box sx={itemComponentBoxSecondaryStyle}>
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={
                  currentDirector.image
                    ? currentDirector.image
                    : 'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                }
                alt={currentDirector.fullName}
              />
            </Card>
          </Box>
          <Box sx={itemInformationBoxStyle}>
            <Typography variant='h5' component='div'>
              FullName:{' '}
              {currentDirector.fullName ? currentDirector.fullName : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div'>
              Birth year:{' '}
              {currentDirector.birthYear
                ? currentDirector.birthYear
                : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div'>
              Nationality:{' '}
              {currentDirector.nationality
                ? currentDirector.nationality
                : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Movies: {formattedMovies ? formattedMovies : 'Unknown'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DirectorsItem;
