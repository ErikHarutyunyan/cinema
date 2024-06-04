const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

router.post('/:movieId/seats/:seatId/book', seatController.bookSeat);

module.exports = router;