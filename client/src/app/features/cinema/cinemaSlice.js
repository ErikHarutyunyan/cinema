import { createSlice } from '@reduxjs/toolkit';

import { bookSeats, createRoom, deleteMovie, deleteRoom, getMovie, getRoomById, getRooms, updateMovie, updateRoomName } from './cinemaActions';

const initialState = {
  loading: true,
  error: null,
  message: '',
  rooms: [],
  room: null,
  movies: [],
  movie: null,
};

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState,
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
      state.loading = false;
    },
    setRoom: (state, { payload }) => {
      state.room = payload;
      state.loading = false;
    },
    setMovies: (state, { payload }) => {
      state.rooms = payload;
      state.loading = false;
    },
    setMovie: (state, { payload }) => {
      state.rooms = payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(getRooms.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.rooms = payload;
      })
      .addCase(getRooms.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(getRoomById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.room = payload;
        state.movies = payload.movies;
      })
      .addCase(getRoomById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(updateRoomName.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(updateRoomName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.room = payload;
      })
      .addCase(updateRoomName.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(createRoom.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRoom.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(deleteRoom.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload;
      })
      .addCase(deleteRoom.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(getMovie.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movie = payload;
      })
      .addCase(getMovie.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(bookSeats.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(bookSeats.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.movie = payload;
      })
      .addCase(bookSeats.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(updateMovie.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.movie = payload;
      })
      .addCase(updateMovie.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = '';
      })
      .addCase(deleteMovie.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.movie = payload;
      })
      .addCase(deleteMovie.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
      });
  },
});

export const { setRooms, setRoom, setMovies, setMovie } = cinemaSlice.actions;

export const selectCinema = (state) => state.cinema;

export default cinemaSlice.reducer;
