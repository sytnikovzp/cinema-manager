import { Button, Stack } from '@mui/material';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

function Actors() {
  return (
    <>
      <Stack>
        <Link to='new'>
          <Button>Add actor</Button>
        </Link>
      </Stack>

      <Routes>
        <Route path=':id' element={<ActorsItem />} />
        <Route path='/' element={<ActorsList />} />
        <Route path='new' element={<Navigate to='/actors/new/:id' />} />
      </Routes>
    </>
  );
}

export default Actors;
