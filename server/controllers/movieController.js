import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Movie from '../models/Movie.js';
import Room from '../models/Room.js';
import Seat from '../models/Seat.js';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkTimeConflict = async (roomId, startTime, endTime) => {

    const bufferStartTime = new Date(startTime);
    const bufferEndTime = new Date(endTime);

    bufferStartTime.setMinutes(bufferStartTime.getMinutes() - 15);
    bufferEndTime.setMinutes(bufferEndTime.getMinutes() + 15);
    
    bufferStartTime.toISOString()
    bufferEndTime.toISOString()

    return await Movie.exists({
        room: roomId,
        $or: [
            { startTime: { $lt: bufferEndTime }, endTime: { $gt: bufferStartTime } }
        ]
    });
};

// Utility function to delete a poster file
const deletePoster = (posterPath) => {
    fs.unlink(path.join(__dirname, '..', posterPath), (err) => {
        if (err) console.error('Failed to delete poster:', err);
    });
};

export const createMovie = async (req, res) => {
    try {
        const { title, description, roomId, startTime, endTime } = req.body;
        const poster = req.file ? path.posix.join('uploads', req.file.filename) : null;

        const parsedStartTime = new Date(startTime);
        const parsedEndTime = new Date(endTime);

        const currentTime = new Date();
        
        // Validate times
        if (parsedStartTime < currentTime || parsedEndTime < currentTime) {
            return res.status(400).json({ message: 'The movie times cannot be in the past.' });
        }

        if (parsedStartTime.toDateString() !== parsedEndTime.toDateString()) {
            return res.status(400).json({ message: 'The start and end times must be on the same day.' });
        }

        // Check for time conflicts
        if (await checkTimeConflict(roomId, startTime, endTime)) {
            return res.status(400).json({ message: 'There is already a movie scheduled at this time.' });
        }

        const seats = [];
        for (let row = 1; row <= 10; row++) {
            for (let number = 1; number <= 8; number++) {
                const seat = new Seat({ row, number });
                await seat.save();
                seats.push(seat._id);
            }
        }

        // Create and save movie
        const movie = new Movie({ title, description, poster, room: roomId, startTime, endTime, seats });
        await movie.save();

        // Update room with new movie
        await Room.findByIdAndUpdate(roomId, { $push: { movies: movie._id } });

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { title, description, startTime, endTime } = req.body;
        const poster = req.file ? path.posix.join('uploads', req.file.filename) : null;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const parsedStartTime = startTime ? new Date(startTime) : null;
        const parsedEndTime = endTime ? new Date(endTime) : null;
        const currentTime = new Date();

       // Validate times
        if ((parsedStartTime && parsedStartTime < currentTime) || (parsedEndTime && parsedEndTime < currentTime)) {
            return res.status(400).json({ message: 'The movie times cannot be in the past.' });
        }
        if (parsedStartTime && parsedEndTime && parsedStartTime.toDateString() !== parsedEndTime.toDateString()) {
            return res.status(400).json({ message: 'The start and end times must be on the same day.' });
        }

        // Check for time conflicts
        if (startTime && endTime && await checkTimeConflict(movie.room, parsedStartTime, parsedEndTime)) {
            return res.status(400).json({ message: 'There is already a movie scheduled at this time.' });
        }

        // Update movie data
        if (title) movie.title = title;
        if (description) movie.description = description;
        if (startTime) movie.startTime = parsedStartTime;
        if (endTime) movie.endTime = parsedEndTime;
        if (poster) {
            if (movie.poster) deletePoster(movie.poster);
            movie.poster = poster;
        }

        await movie.save();

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a movie and its associated seats
export const deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Delete the poster file if it exists
        if (movie.poster) deletePoster(movie.poster);

        // Trigger the pre remove middleware
        await movie.deleteOne();
        res.status(200).json({ message: 'Movie and associated seats deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Book seats for a movie
export const bookSeats = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { seatIds } = req.body;

        const unavailableSeats = [];
        const bookedSeats = [];

        for (const seatId of seatIds) {
            const seat = await Seat.findById(seatId);

            if (!seat || !seat.isAvailable) {
                unavailableSeats.push(seatId);
            } else {
                seat.isAvailable = false;
                seat.movie = movieId;
                await seat.save();
                bookedSeats.push(seatId);
            }
        }

        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: 'Some seats are not available',
                unavailableSeats
            });
        }

        res.status(200).json({ message: 'Seats booked successfully', bookedSeats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a movie by ID
export const getMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId).populate('seats').lean();
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get unavailable times for a specific room and date
export const getUnavailableTimes = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { date } = req.body;

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const movies = await Movie.find({
            room: roomId,
            startTime: { $gte: startOfDay },
            endTime: { $lte: endOfDay }
        });

        const unavailableTimes = movies.map(movie => ({
            startTime: movie.startTime.toISOString().split('T')[1].split('.')[0],
            endTime: movie.endTime.toISOString().split('T')[1].split('.')[0]
        }));

        res.status(200).json(unavailableTimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get unavailable seats for a movie
export const getUnavailableSeats = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId).populate('seats').lean();
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const unavailableSeats = movie.seats.filter(seat => !seat.isAvailable);

        res.status(200).json(unavailableSeats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update movie seats
export const updateMovieSeats = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { seats } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await Seat.deleteMany({ _id: { $in: movie.seats } });
        const newSeats = [];
        for (let seat of seats) {
            const newSeat = new Seat({ ...seat, movie: movieId });
            await newSeat.save();
            newSeats.push(newSeat._id);
        }
        movie.seats = newSeats;
        await movie.save();
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};