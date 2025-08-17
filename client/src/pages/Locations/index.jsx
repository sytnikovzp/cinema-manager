// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '@/src/services/styleService';

// import { getAllLocations } from '@/src/store/slices/locationsSlice';
import LocationsItem from '@/src/components/Locations/LocationsItem';
import LocationsList from '@/src/components/Locations/LocationsList';

function LocationsPage() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllLocations());
  // }, [dispatch]);

  const location = useLocation();
  const applyPaperStyles =
    !location.pathname.includes('/edit') && !location.pathname.includes('/new');

  return (
    <Box sx={styleEntityBox}>
      <Paper
        elevation={3}
        sx={applyPaperStyles ? rootComponentPaperStyle : null}
      >
        <Routes>
          <Route element={<LocationsList />} path='/' />
          <Route element={<LocationsItem />} path=':uuid' />
          <Route
            element={<Navigate to={`/locations/new/:uuid`} />}
            path='new'
          />
          <Route
            element={<Navigate to={`/locations/edit/:uuid`} />}
            path='edit'
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default LocationsPage;
