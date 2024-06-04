const Seat = require('../models/Seat');

// Book Cinema Sats
exports.bookSeat = async (req, res) => {
    try {
        const { movieId, seatId } = req.params;
        const seat = await Seat.findById(seatId);

        if (!seat || !seat.isAvailable) {
            return res.status(400).json({ message: 'Seat not available' });
        }

        seat.isAvailable = false;
        seat.movie = movieId;
        await seat.save();

        res.status(200).json({ message: 'Seat booked successfully', seat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
