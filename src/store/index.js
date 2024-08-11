import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
// =============================================
import actorsReducer from './slices/actorsSlice';
import directorsReducer from './slices/directorsSlice';
import moviesReducer from './slices/moviesSlice';
import studiosReducer from './slices/studiosSlice';

export default configureStore({
  reducer: {
    actorsList: actorsReducer,
    directorsList: directorsReducer,
    moviesList: moviesReducer,
    studiosList: studiosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
