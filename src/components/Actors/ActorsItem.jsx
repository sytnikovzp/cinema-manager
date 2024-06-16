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
  scrollListBoxStyle,
  buttonMainStyle,
  itemComponentBoxMainStyle,
  itemComponentBoxSecondaryStyle,
  itemInformationBoxStyle,
  scrollMovieBoxStyle,
} from '../../services/styleService';
// =============================================
import { emptyActor } from '../../constants';
import { resetStatus } from '../../store/slices/actorsSlice';
// =============================================
import useSnackbar from '../../hooks';

function ActorsItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const actors = useSelector((state) => state.actorsList.actors);
  const status = useSelector((state) => state.actorsList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();
  const [tabIndex, setTabIndex] = useState(0);

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

  const actor = actors.find((actor) => Number(actor.id) === Number(id));

  const currentActor = actor ? actor : emptyActor;

  const formattedMovies = currentActor.movies
    ? currentActor.movies.join(', ')
    : 'No movies available';

  const goBack = () => {
    navigate('/actors');
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
          to={`/actors/new/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to='/actors/new'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<GroupAddIcon />}
        >
          Add actor
        </Button>
      </Stack>

      <Divider />
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label='actor details tabs'
      >
        <Tab label='Brief information' />
        {currentActor.image && <Tab label='Actor biography' />}
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={scrollListBoxStyle}>
          <Box sx={itemComponentBoxMainStyle}>
            <Box sx={itemComponentBoxSecondaryStyle}>
              <Card>
                <CardMedia
                  component='img'
                  height='100%'
                  image={
                    currentActor.image
                      ? currentActor.image
                      : 'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                  alt={currentActor.fullName}
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography variant='h5' component='div'>
                FullName:{' '}
                {currentActor.fullName ? currentActor.fullName : 'Unknown'}
              </Typography>
              <Typography variant='body1' component='div'>
                Birth year:{' '}
                {currentActor.birthYear ? currentActor.birthYear : 'Unknown'}
              </Typography>
              <Typography variant='body1' component='div'>
                Nationality:{' '}
                {currentActor.nationality
                  ? currentActor.nationality
                  : 'Unknown'}
              </Typography>
              <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
                Movies: {formattedMovies ? formattedMovies : 'Unknown'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {tabIndex === 1 && currentActor.image && (
        <Box sx={scrollMovieBoxStyle}>
          {/* <MoviesPlayer trailer={currentMovie.trailer} /> */}
        </Box>
      )}

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

export default ActorsItem;
