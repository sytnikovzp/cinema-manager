import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// =============================================
import {
  scrollItemBoxStyle,
  buttonMainStyle,
  itemComponentBoxMainStyle,
  itemCardMediaBoxStyle,
  itemInformationBoxStyle,
  itemLinkStyle,
} from '../../services/styleService';
// =============================================
import { emptyDirector, calculateAge, formatDate } from '../../constants';
import { resetStatus } from '../../store/slices/directorsSlice';
// =============================================
import useSnackbar from '../../hooks/useSnackbar';
// =============================================
import DirectorsBiography from './DirectorsBiography';

function DirectorsItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const directors = useSelector((state) => state.directorsList.directors);
  const moviesList = useSelector((state) => state.moviesList.movies);
  const status = useSelector((state) => state.directorsList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (
      currentStatus &&
      currentStatus !== prevStatus &&
      currentStatus !== 'loading'
    ) {
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

  const filteredMoviesList = moviesList
    .filter((movie) => movie.directors.includes(currentDirector.full_name))
    .map((movie) => ({ id: movie.id, title: movie.title }));

  const formattedMovies =
    filteredMoviesList.length > 0
      ? filteredMoviesList
          .map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              style={itemLinkStyle}
            >
              {movie.title}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No movies available';

  const formattedbirth_date = formatDate(currentDirector.birth_date);
  const formatteddeath_date = formatDate(currentDirector.death_date);

  const calculatedAge = calculateAge(
    currentDirector.birth_date,
    currentDirector.death_date
  );

  const goBack = () => {
    navigate('/directors');
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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
          To directors
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
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label='director details tabs'
      >
        <Tab label='General information' />
        {currentDirector.biography && <Tab label='About the director' />}
      </Tabs>

      <Box sx={scrollItemBoxStyle}>
        <Box sx={itemComponentBoxMainStyle}>
          <Box sx={itemCardMediaBoxStyle}>
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={
                  currentDirector.photo ||
                  'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                }
                alt={currentDirector.full_name}
              />
            </Card>
          </Box>
          <Box sx={itemInformationBoxStyle}>
            <Typography
              variant='h5'
              component='div'
              sx={{ fontWeight: 'bold' }}
            >
              {currentDirector.full_name || 'Unknown director'}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                }}
                component='div'
              >
                Birth date:
              </Typography>
              <Typography variant='body1' component='div'>
                {currentDirector.birth_date ? formattedbirth_date : 'Unknown'}
                {currentDirector.birth_date &&
                  (currentDirector.birth_date && currentDirector.death_date
                    ? ` (aged ${calculatedAge})`
                    : ` (age ${calculatedAge})`)}
              </Typography>
            </Stack>

            {currentDirector.death_date && (
              <Stack direction='row' spacing={1}>
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 'bold',
                  }}
                  component='div'
                >
                  Death date:
                </Typography>
                <Typography variant='body1' component='div'>
                  {formatteddeath_date}
                </Typography>
              </Stack>
            )}

            <Stack direction='row' spacing={1}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                }}
                component='div'
              >
                Nationality:
              </Typography>
              <Typography variant='body1' component='div'>
                {currentDirector.nationality || 'Unknown'}
              </Typography>
            </Stack>

            {tabIndex === 0 && (
              <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 'bold',
                  }}
                  component='div'
                >
                  Movies:
                </Typography>
                <Typography variant='body1' component='div'>
                  {formattedMovies}
                </Typography>
              </Stack>
            )}

            {tabIndex === 1 && currentDirector.biography && (
              <DirectorsBiography />
            )}
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
