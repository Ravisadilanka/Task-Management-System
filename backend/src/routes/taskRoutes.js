import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskById } from '../controllers/taskController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createTask)
router.get('/', protect, getTasks)
router.put('/:id', protect, updateTask)
router.get("/:id", protect, getTaskById);
router.delete('/:id', protect, deleteTask)

export default router;