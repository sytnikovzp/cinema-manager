import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
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
} from '../../services/styleService';
// =============================================
import { emptyStudio } from '../../constants';
import { resetStatus } from '../../store/slices/studiosSlice';
// =============================================
import useSnackbar from '../../hooks';
// =============================================
import StudiosAbout from './StudiosAbout';

function StudiosItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const studios = useSelector((state) => state.studiosList.studios);
  const moviesList = useSelector((state) => state.moviesList.movies);
  const status = useSelector((state) => state.studiosList.status);

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

  const studio = studios.find((studio) => Number(studio.id) === Number(id));

  const currentStudio = studio ? studio : emptyStudio;

  const filteredMoviesList = moviesList
    .filter((movie) => movie.studios.includes(currentStudio.title))
    .map((movie) => movie.title);

  const formattedMovies =
    filteredMoviesList.join(', ') || 'No movies available';

  const goBack = () => {
    navigate('/studios');
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
          Go back
        </Button>

        <Button
          type='button'
          variant='contained'
          color='warning'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/studios/new/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to='/studios/new'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<DomainAddIcon />}
        >
          Add studio
        </Button>
      </Stack>

      <Divider />
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label='studio details tabs'
      >
        <Tab label='General information' />
        {currentStudio.about && <Tab label='About the studio' />}
      </Tabs>

      <Box sx={scrollItemBoxStyle}>
        <Box sx={itemComponentBoxMainStyle}>
          <Box sx={itemCardMediaBoxStyle}>
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={
                  currentStudio.logo ||
                  'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                }
                alt={currentStudio.title}
              />
            </Card>
          </Box>
          <Box sx={itemInformationBoxStyle}>
            <Typography
              variant='h5'
              component='div'
              sx={{ fontWeight: 'bold' }}
            >
              {currentStudio.title || 'Unknown studio'}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                }}
                component='div'
              >
                Foundation year:
              </Typography>
              <Typography variant='body1' component='div'>
                {currentStudio.foundation_year || 'Unknown'}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1}>
              <Typography
                variant='body1'
                sx={{
                  fontWeight: 'bold',
                }}
                component='div'
              >
                Location:
              </Typography>
              <Typography variant='body1' component='div'>
                {currentStudio.location || 'Unknown'}
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

            {tabIndex === 1 && currentStudio.about && <StudiosAbout />}
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

export default StudiosItem;
