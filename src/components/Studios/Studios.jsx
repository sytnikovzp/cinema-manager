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
import { getAllStudios, createStudio } from '../../store/slices/studiosSlice';
// =============================================
import StudiosItem from './StudiosItem';
import StudiosList from './StudiosList';

function Studios() {
  const dispatch = useDispatch();

  const studios = useSelector((state) => state.studiosList.studios);

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  const onCreateStudio = () => {
    dispatch(createStudio());
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
            onClick={onCreateStudio}
          >
            Add studio
          </Button>
        </Stack>

        <Routes>
          <Route path='/' element={<StudiosList studios={studios} />} />
          <Route path=':studioId' element={<StudiosItem />} />
          <Route path='new' element={<Navigate to='/studios/new/:studioId' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Studios;
