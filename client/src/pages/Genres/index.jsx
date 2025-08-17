// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// import { getAllGenres } from '@/src/store/slices/genresSlice';
import GenresItem from '@/src/components/Genres/GenresItem';
import GenresList from '@/src/components/Genres/GenresList';

import { rootComponentPaperStyle, styleEntityBox } from '@/src/styles';

function GenresPage() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllGenres());
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
          <Route element={<GenresList />} path='/' />
          <Route element={<GenresItem />} path=':uuid' />
          <Route element={<Navigate to={`/genres/new/:uuid`} />} path='new' />
          <Route element={<Navigate to={`/genres/edit/:uuid`} />} path='edit' />
        </Routes>
      </Paper>
    </Box>
  );
}

export default GenresPage;
