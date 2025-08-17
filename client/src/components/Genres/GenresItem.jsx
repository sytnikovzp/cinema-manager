import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import SnackbarContext from '@/src/contexts/SnackbarContext';

import { getGenreByUuid } from '@/src/services/genreService';
import {
  buttonMainStyle,
  itemCardMediaBoxStyle,
  itemComponentBoxMainStyle,
  itemInformationBoxStyle,
  itemLinkStyle,
  scrollItemBoxStyle,
  styleItemCreatedAtLabel,
  styleItemCreatedAtValue,
  styleItemTypography,
  styleStackMargin,
} from '@/src/services/styleService';

import ItemSkeleton from '@/src/components/SkeletonLoader/ItemSkeleton';

const emptyGenre = {
  uuid: null,
  title: '',
  logo: '',
};

function GenresItem() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [genre, setGenre] = useState(emptyGenre);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchGenre = useCallback(async () => {
    try {
      const data = await getGenreByUuid(uuid);
      setGenre(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setGenre(emptyGenre);
      setLoading(false);
    } else {
      fetchGenre();
    }
  }, [uuid, fetchGenre]);

  const handleGoBack = useCallback(() => {
    navigate(`/genres`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

  const formattedMovies =
    genre.movies && genre.movies.length > 0
      ? genre.movies
          .map((movie) => (
            <Link
              key={movie.uuid}
              style={itemLinkStyle}
              to={`/movies/${movie.uuid}`}
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
          color='info'
          startIcon={<KeyboardBackspaceIcon />}
          sx={buttonMainStyle}
          type='button'
          variant='contained'
          onClick={handleGoBack}
        >
          To genres
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/genres/edit/${uuid}`}
          type='button'
          variant='contained'
        >
          Edit
        </Button>

        <Button
          color='success'
          component={Link}
          startIcon={<GroupAddIcon />}
          sx={buttonMainStyle}
          to={`/genres/new`}
          type='button'
          variant='contained'
        >
          Add genre
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='genre details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='General information' />
        </Tabs>

        {(genre.createdAt || genre.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {genre.createdAt === genre.updatedAt ? (
              <>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtLabel}
                  variant='caption'
                >
                  Created at:
                </Typography>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtValue}
                  variant='caption'
                >
                  {genre.createdAt}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtLabel}
                  variant='caption'
                >
                  Updated at:
                </Typography>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtValue}
                  variant='caption'
                >
                  {genre.updatedAt}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Box>

      <Box sx={scrollItemBoxStyle}>
        {loading ? (
          <ItemSkeleton />
        ) : (
          <Box sx={itemComponentBoxMainStyle}>
            <Box sx={itemCardMediaBoxStyle}>
              <Card>
                <CardMedia
                  alt={genre.title}
                  component='img'
                  height='100%'
                  image={
                    genre.logo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography component='div' sx={styleItemTypography} variant='h5'>
                {genre.title || 'Unknown genre'}
              </Typography>

              {tabIndex === 0 && (
                <Stack direction='row' spacing={1} sx={styleStackMargin}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Movies:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {formattedMovies}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default GenresItem;
