import mongoose from 'mongoose';
import Movie from './Movie.js';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    movies: [{ type: String, ref: 'Movie' }]
});

roomSchema.pre('deleteOne', async function(next) {
    try {
        await Movie.deleteMany({ room: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('Room', roomSchema);