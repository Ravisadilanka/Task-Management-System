import express from 'express';
import { getCurrentUser, getUsers } from '../controllers/userController.js';
import authorize from '../middleware/authorize.js';
import protect from '../middleware/auth.js'

const router = express.Router();

router.get('/me', protect, getCurrentUser);
router.get('/', protect, authorize('admin'), getUsers)

export default router;