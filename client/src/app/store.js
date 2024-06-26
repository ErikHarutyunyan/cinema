import { configureStore } from '@reduxjs/toolkit';

import cinemaReducer from './features/cinema/cinemaSlice';

export const store = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});
