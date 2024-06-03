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
import { buttonStyle } from '../../services/styleService';
// =============================================
import { getAllActors, addNewActor } from '../../store/slices/actorsSlice';
// =============================================
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
  const dispatch = useDispatch();

  const actors = useSelector((state) => state.actorsList.actors);

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  const onNewActor = () => {
    dispatch(addNewActor());
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
        <Stack
          direction='row'
          justifyContent='right'
        >
          <Button
            component={Link}
            to='new'
            id='new-btn'
            type='button'
            variant='contained'
            color='success'
            style={buttonStyle}
            startIcon={<GroupAddIcon />}
            onClick={onNewActor}
          >
            Add actor
          </Button>
        </Stack>

        <Routes>
          <Route path=':id' element={<ActorsItem />} />
          <Route path='/' element={<ActorsList actors={actors} />} />
          <Route path='new' element={<Navigate to='/actors/new/:id' />} />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Actors;
