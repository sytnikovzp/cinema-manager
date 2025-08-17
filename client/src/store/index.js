import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import actorsReducer from '@/src/store/slices/actorsSlice';
import directorsReducer from '@/src/store/slices/directorsSlice';
import moviesReducer from '@/src/store/slices/moviesSlice';
import studiosReducer from '@/src/store/slices/studiosSlice';

export default configureStore({
  reducer: {
    actorsList: actorsReducer,
    directorsList: directorsReducer,
    moviesList: moviesReducer,
    studiosList: studiosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
