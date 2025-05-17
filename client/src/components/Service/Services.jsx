import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '../../services/styleService';

import ServicesList from './ServicesList';

function Services() {
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
          <Route element={<ServicesList />} path='/' />
          <Route
            element={<Navigate to={`/services/new-genres/:id`} />}
            path={`new-genres`}
          />
          <Route
            element={<Navigate to={`/services/edit-genres/:id`} />}
            path={`edit-genres`}
          />
          <Route
            element={<Navigate to={`/services/new-countries/:id`} />}
            path={`new-countries`}
          />
          <Route
            element={<Navigate to={`/services/edit-countries/:id`} />}
            path={`edit-countries`}
          />
          <Route
            element={<Navigate to={`/services/new-locations/:id`} />}
            path={`new-locations`}
          />
          <Route
            element={<Navigate to={`/services/edit-locations/:id`} />}
            path={`edit-locations`}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Services;
