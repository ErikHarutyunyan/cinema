import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    row: { type: Number, required: true },
    number: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    movie: { type: String, ref: 'Movie' }
});

export default mongoose.model('Seat', seatSchema);