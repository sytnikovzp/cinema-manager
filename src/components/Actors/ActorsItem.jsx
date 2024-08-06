import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { emptyActor } from '../../constants';
import { calculateAge, formatDate } from '../../services/itemService';
// =============================================
import ActorsBiography from './ActorsBiography';

function ActorsItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const actors = useSelector((state) => state.actorsList.actors);
  const moviesList = useSelector((state) => state.moviesList.movies);

  const [tabIndex, setTabIndex] = useState(0);

  const actor = actors.find((actor) => Number(actor.id) === Number(id));

  const currentActor = actor || emptyActor;

  const filteredMoviesList = moviesList
    .filter((movie) => movie.actors.includes(currentActor.full_name))
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

  const formattedbirth_date = formatDate(currentActor.birth_date);
  const formatteddeath_date = formatDate(currentActor.death_date);

  const calculatedAge = calculateAge(
    currentActor.birth_date,
    currentActor.death_date
  );

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
          To actors
        </Button>

        <Button
          type='button'
          variant='contained'
          color='warning'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/actors/edit/${id}`}
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
        <Tab label='General information' />
        {currentActor.biography && <Tab label='About the actor' />}
      </Tabs>

      <Box sx={scrollItemBoxStyle}>
        <Box sx={itemComponentBoxMainStyle}>
          <Box sx={itemCardMediaBoxStyle}>
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={
                  currentActor.photo ||
                  'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                }
                alt={currentActor.full_name}
              />
            </Card>
          </Box>
          <Box sx={itemInformationBoxStyle}>
            <Typography
              variant='h5'
              component='div'
              sx={{ fontWeight: 'bold' }}
            >
              {currentActor.full_name || 'Unknown actor'}
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
                {currentActor.birth_date ? formattedbirth_date : 'Unknown'}
                {currentActor.birth_date &&
                  (currentActor.birth_date && currentActor.death_date
                    ? ` (aged ${calculatedAge})`
                    : ` (age ${calculatedAge})`)}
              </Typography>
            </Stack>

            {currentActor.death_date && (
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
                {currentActor.nationality || 'Unknown'}
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

            {tabIndex === 1 && currentActor.biography && <ActorsBiography />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ActorsItem;
