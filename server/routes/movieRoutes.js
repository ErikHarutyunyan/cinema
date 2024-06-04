import express from 'express';
import { createMovie, updateMovie, updateMovieSeats, deleteMovie, getUnavailableTimes, getUnavailableSeats, bookSeats, getMovie } from '../controllers/movieController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('poster'), createMovie);
router.get('/:movieId', getMovie);
router.put('/:movieId', upload.single('poster'), updateMovie);
router.put('/:movieId/seats', updateMovieSeats);
router.delete('/:movieId', deleteMovie);
router.post('/:movieId/seats/book', bookSeats);
router.post('/:roomId/unavailable-times', getUnavailableTimes);
router.get('/:movieId/seats/unavailable', getUnavailableSeats);

export default router;