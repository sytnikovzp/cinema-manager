import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// =============================================
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// =============================================
import { rootComponentPaperStyle } from '../../services/styleService';
// =============================================
import {
  SERVICES_ENTITY_NAME,
  GENRES_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  LOCATIONS_ENTITY_NAME,
} from '../../constants';
// =============================================
import ServicesList from './ServicesList';

function Services() {
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
          <Route path='/' element={<ServicesList />} />
          <Route
            path={`new-${GENRES_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/new-${GENRES_ENTITY_NAME}/:id`}
              />
            }
          />
          <Route
            path={`edit-${GENRES_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/edit-${GENRES_ENTITY_NAME}/:id`}
              />
            }
          />
          <Route
            path={`new-${COUNTRIES_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/new-${COUNTRIES_ENTITY_NAME}/:id`}
              />
            }
          />
          <Route
            path={`edit-${COUNTRIES_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/edit-${COUNTRIES_ENTITY_NAME}/:id`}
              />
            }
          />
          <Route
            path={`new-${LOCATIONS_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/new-${LOCATIONS_ENTITY_NAME}/:id`}
              />
            }
          />
          <Route
            path={`edit-${LOCATIONS_ENTITY_NAME}`}
            element={
              <Navigate
                to={`/${SERVICES_ENTITY_NAME}/edit-${LOCATIONS_ENTITY_NAME}/:id`}
              />
            }
          />
        </Routes>
      </Paper>
    </Box>
  );
}

export default Services;
