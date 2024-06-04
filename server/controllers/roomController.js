import Room from '../models/Room.js';
import Movie from '../models/Movie.js';
import mongoose from 'mongoose';

// Create a new room
export const createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Room name is required' });
        }

        const room = new Room({ name });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a room by ID
export const getRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ message: 'Invalid Room ID' });
        }

        const room = await Room.findById(roomId).populate('movies');
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a room's name
export const updateRoomName = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Room name is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ message: 'Invalid Room ID' });
        }

        const room = await Room.findByIdAndUpdate(roomId, { name }, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error('Error updating room name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Delete associated movies and their seats
        const movies = await Movie.find({ room: roomId });
        for (const movie of movies) {
            await movie.deleteOne();
        }

        // Delete the room
        await Room.deleteOne({ _id: roomId });

        res.status(200).json({ message: 'Room and associated movies deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};