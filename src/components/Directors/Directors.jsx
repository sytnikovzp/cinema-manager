import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
// =============================================
import { getAllDirectors, createDirector } from '../../store/slices/directorsSlice';
// =============================================
import DirectorsItem from './DirectorsItem';
import DirectorsList from './DirectorsList';

function Directors() {
  const dispatch = useDispatch();

  const directors = useSelector((state) => state.directorsList.directors);

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

  const onCreateDirector = () => {
    dispatch(createDirector());
  };

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: '10px',
        }}
      >
        <Stack direction='row' justifyContent='right'>
          <Button
            component={Link}
            to='new'
            type='button'
            variant='contained'
            color='success'
            sx={buttonMainStyle}
            startIcon={<GroupAddIcon />}
            onClick={onCreateDirector}
          >
            Add director
          </Button>
        </Stack>

        <Routes>
          <Route path='/' element={<DirectorsList directors={directors} />} />
          <Route path=':directorId' element={<DirectorsItem />} />
          <Route path='new' element={<Navigate to='/directors/new/:directorId' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Directors;
