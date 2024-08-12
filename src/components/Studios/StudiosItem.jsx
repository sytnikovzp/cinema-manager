import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
  emptyStudio,
} from '../../constants';
// =============================================
import { getStudioById } from '../../services/studioService';
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
import StudiosAbout from './StudiosAbout';

function StudiosItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studio, setStudio] = useState(emptyStudio);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchStudio = useCallback(async () => {
    try {
      const data = await getStudioById(id);
      setStudio(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setStudio(emptyStudio);
      setLoading(false);
    } else {
      fetchStudio();
    }
  }, [id, fetchStudio]);

  const goBack = () => {
    navigate(`/${STUDIOS_ENTITY_NAME}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formattedMovies =
    studio.movies && studio.movies.length > 0
      ? studio.movies
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
          To studios
        </Button>

        <Button
          type='button'
          variant='contained'
          color='warning'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/${STUDIOS_ENTITY_NAME}/edit/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to={`/${STUDIOS_ENTITY_NAME}/new`}
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

      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label='studio details tabs'
        >
          <Tab label='General information' />
          {studio.about && <Tab label='About the studio' />}
        </Tabs>

        {(studio.createdAt || studio.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {studio.createdAt === studio.updatedAt ? (
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
                  {studio.createdAt}
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
                  {studio.updatedAt}
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
                    studio.logo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                  alt={studio.title}
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography
                variant='h5'
                component='div'
                sx={{ fontWeight: 'bold' }}
              >
                {studio.title || 'Unknown studio'}
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
                  {studio.foundation_year || 'Unknown'}
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
                  {studio.location || 'Unknown'}
                  {studio.country ? ` (${studio.country})` : ''}
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

              {tabIndex === 1 && studio.about && (
                <StudiosAbout about={studio.about} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default StudiosItem;
