import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  buttonMainStyle,
  itemComponentBoxMainStyle,
  itemComponentBoxSecondaryStyle,
  itemComponentBoxThirdStyle,
} from '../../services/styleService';
import { emptyActor } from '../../constants';
import { getAllActors, resetStatus } from '../../store/slices/actorsSlice';
// =============================================
import useSnackbar from '../../hooks';

function ActorsItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/actors');
  };

  const actors = useSelector((state) => state.actorsList.actors);
  const status = useSelector((state) => state.actorsList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

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

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          id='goBack-btn'
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
          id='goBack-btn'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/actors/new/${id}`}
        >
          Edit
        </Button>
      </Stack>

      <Divider />

      <Box
        sx={{
          minHeight: '60vh',
          overflowY: 'auto',
        }}
      >
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
          <Box sx={itemComponentBoxThirdStyle}>
            <Typography variant='h6' component='div'>
              FullName: {currentActor.fullName}
            </Typography>
            <Typography variant='body1' component='div'>
              Birth year:{' '}
              {currentActor.birthYear ? currentActor.birthYear : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div'>
              Nationality:{' '}
              {currentActor.nationality ? currentActor.nationality : 'Unknown'}
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

export default ActorsItem;
