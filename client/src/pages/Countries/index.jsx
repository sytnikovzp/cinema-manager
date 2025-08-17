// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// import { getAllCountries } from '@/src/store/slices/countriesSlice';
import CountriesItem from '@/src/components/Countries/CountriesItem';
import CountriesList from '@/src/components/Countries/CountriesList';

import { rootComponentPaperStyle, styleEntityBox } from '@/src/styles';

function CountriesPage() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCountries());
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
          <Route element={<CountriesList />} path='/' />
          <Route element={<CountriesItem />} path=':uuid' />
          <Route
            element={<Navigate to={`/countries/new/:uuid`} />}
            path='new'
          />
          <Route
            element={<Navigate to={`/countries/edit/:uuid`} />}
            path='edit'
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default CountriesPage;
