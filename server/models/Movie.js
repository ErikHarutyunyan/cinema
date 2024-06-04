import mongoose from 'mongoose';
import Room from './Room.js';
import Seat from './Seat.js';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String },
    room: { type: String, ref: 'Room', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    seats: [{ type: String, ref: 'Seat' }]
});

movieSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        await Room.updateOne({ _id: this.room }, { $pull: { movies: this._id } });
        await Seat.deleteMany({ _id: { $in: this.seats } });
        next();
    } catch (err) {
        next(err);
    }
});
export default mongoose.model('Movie', movieSchema);