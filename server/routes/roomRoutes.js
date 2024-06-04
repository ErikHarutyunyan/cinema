import express from 'express';
import { createRoom, getRooms, getRoomById, updateRoomName, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:roomId', getRoomById);
router.put('/:roomId', updateRoomName);
router.delete('/:roomId', deleteRoom);

export default router;