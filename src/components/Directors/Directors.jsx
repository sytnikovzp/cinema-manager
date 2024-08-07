// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import { DIRECTORS_ENTITY_NAME } from '../../constants';
// =============================================
// import { getAllDirectors } from '../../store/slices/directorsSlice';
// =============================================
import DirectorsItem from './DirectorsItem';
import DirectorsList from './DirectorsList';

function Directors() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllDirectors());
  // }, [dispatch]);

  const location = useLocation();
  const applyPaperStyles =
    !location.pathname.includes('/edit') && !location.pathname.includes('/new');

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={applyPaperStyles ? rootComponentPaperStyle : undefined}
      >
        <Routes>
          <Route path='/' element={<DirectorsList />} />
          <Route path=':id' element={<DirectorsItem />} />
          <Route
            path='new'
            element={<Navigate to={`/${DIRECTORS_ENTITY_NAME}/new/:id`} />}
          />
          <Route
            path='edit'
            element={<Navigate to={`/${DIRECTORS_ENTITY_NAME}/edit/:id`} />}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Directors;
