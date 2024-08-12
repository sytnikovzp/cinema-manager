import { useCallback, useContext, useEffect, useState } from 'react';
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
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  emptyDirector,
} from '../../constants';
// =============================================
import { getDirectorById } from '../../services/directorService';
import { formatDate, calculateAge } from '../../services/itemService';
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
import { renderItemSkeleton } from '../../services/skeletonService';
// =============================================
import DirectorsBiography from './DirectorsBiography';

function DirectorsItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(emptyDirector);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchDirector = useCallback(async () => {
    try {
      const data = await getDirectorById(id);
      setDirector(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setDirector(emptyDirector);
      setLoading(false);
    } else {
      fetchDirector();
    }
  }, [id, fetchDirector]);

  const goBack = () => {
    navigate(`/${DIRECTORS_ENTITY_NAME}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formattedMovies =
    director.movies && director.movies.length > 0
      ? director.movies
          .map((movie) => (
            <Link
              key={movie.id}
              to={`/${MOVIES_ENTITY_NAME}/${movie.id}`}
              style={itemLinkStyle}
            >
              {movie.title}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No movies available';

  const formattedbirth_date = formatDate(director.birth_date);
  const formatteddeath_date = formatDate(director.death_date);
  const calculatedAge = calculateAge(director.birth_date, director.death_date);

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
          to={`/${DIRECTORS_ENTITY_NAME}/edit/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to={`/${DIRECTORS_ENTITY_NAME}/new`}
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

      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label='director details tabs'
        >
          <Tab label='General information' />
          {director.biography && <Tab label='About the director' />}
        </Tabs>

        {(director.createdAt || director.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {director.createdAt === director.updatedAt ? (
              <>
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: 'gray',
                  }}
                  component='div'
                >
                  Created at:
                </Typography>
                <Typography
                  variant='caption'
                  component='div'
                  sx={{ textAlign: 'right', color: 'gray' }}
                >
                  {director.createdAt}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: 'gray',
                  }}
                  component='div'
                >
                  Updated at:
                </Typography>
                <Typography
                  variant='caption'
                  component='div'
                  sx={{ textAlign: 'right', color: 'gray' }}
                >
                  {director.updatedAt}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Box>

      <Box sx={scrollItemBoxStyle}>
        {loading ? (
          renderItemSkeleton()
        ) : (
          <Box sx={itemComponentBoxMainStyle}>
            <Box sx={itemCardMediaBoxStyle}>
              <Card>
                <CardMedia
                  component='img'
                  height='100%'
                  image={
                    director.photo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                  alt={director.full_name}
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography
                variant='h5'
                component='div'
                sx={{ fontWeight: 'bold' }}
              >
                {director.full_name || 'Unknown director'}
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
                  {director.birth_date ? formattedbirth_date : 'Unknown'}
                  {director.birth_date &&
                    (director.birth_date && director.death_date
                      ? ` (aged ${calculatedAge})`
                      : ` (age ${calculatedAge})`)}
                </Typography>
              </Stack>
              {director.death_date && (
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
                  {director.country || 'Unknown'}
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
              {tabIndex === 1 && director.biography && (
                <DirectorsBiography biography={director.biography} />
              )}{' '}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default DirectorsItem;
