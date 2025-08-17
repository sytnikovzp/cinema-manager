import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  rootComponentPaperStyle,
  styleEntityBox,
} from '@/src/services/styleService';

import ServicesList from '@/src/components/Service/ServicesList';

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
            element={<Navigate to={`/services/new-genres/:uuid`} />}
            path={`new-genres`}
          />
          <Route
            element={<Navigate to={`/services/edit-genres/:uuid`} />}
            path={`edit-genres`}
          />
          <Route
            element={<Navigate to={`/services/new-countries/:uuid`} />}
            path={`new-countries`}
          />
          <Route
            element={<Navigate to={`/services/edit-countries/:uuid`} />}
            path={`edit-countries`}
          />
          <Route
            element={<Navigate to={`/services/new-locations/:uuid`} />}
            path={`new-locations`}
          />
          <Route
            element={<Navigate to={`/services/edit-locations/:uuid`} />}
            path={`edit-locations`}
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Services;
