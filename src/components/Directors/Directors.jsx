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
import { getAllDirectors, addNewDirector } from '../../store/slices/directorsSlice';
// =============================================
import DirectorsItem from './DirectorsItem';
import DirectorsList from './DirectorsList';

function Directors() {
  const dispatch = useDispatch();

  const directors = useSelector((state) => state.directorsList.directors);
  const currentDirector = useSelector((state) => state.directorsList.currentDirector);

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

  const onNewDirector = () => {
    dispatch(addNewDirector());
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
            id='new-btn'
            type='button'
            variant='contained'
            color='success'
            style={buttonMainStyle}
            startIcon={<GroupAddIcon />}
            onClick={onNewDirector}
          >
            Add director
          </Button>
        </Stack>

        <Routes>
          <Route path=':id' element={<DirectorsItem id={currentDirector.id} />} />
          <Route
            path='/'
            element={<DirectorsList directors={directors} currentDirector={currentDirector} />}
          />
          <Route path='new' element={<Navigate to='/directors/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Directors;
