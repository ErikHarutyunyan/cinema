import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '@/configs';

// Rooms Actions
export const createRoom = createAsyncThunk(
  'cinema/createRoom',

  async (name, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(`${BASE_URL}/rooms`, { name }, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRooms = createAsyncThunk(
  'cinema/getRoom',

  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${BASE_URL}/rooms`, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRoomById = createAsyncThunk(
  'cinema/getRoomById',

  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${BASE_URL}/rooms/${id}`, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateRoomName = createAsyncThunk(
  'cinema/updateRoomName',

  async ({ id, name }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(`${BASE_URL}/rooms/${id}`, { name }, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'cinema/deleteRoom',

  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const senderId = id.toString();
      const res = await axios.delete(`${BASE_URL}/rooms/${senderId}`, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Movie
export const createMovie = createAsyncThunk(
  'cinema/createRoom',

  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const res = await axios.post(`${BASE_URL}/movies`, data, config);
      return res.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getMovie = createAsyncThunk(
  'cinema/getMovie',

  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${BASE_URL}/movies/${id}`, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const bookSeats = createAsyncThunk(
  'cinema/updateMovieSeats',

  async ({ movieId, seatIds }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(`${BASE_URL}/movies/${movieId}/seats/book`, { seatIds }, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateMovie = createAsyncThunk(
  'cinema/updateMovie',

  async ({ movieId, data }, { rejectWithValue }) => {
    console.log('🚀 ~ data:', ...data);
    console.log('🚀 ~ movieId:', movieId);
    debugger;
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const res = await axios.put(`${BASE_URL}/movies/${movieId}`, data, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'cinema/deleteMovie',

  async (movieId, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const res = await axios.delete(`${BASE_URL}/movies/${movieId}`, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
