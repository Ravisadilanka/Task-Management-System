import Task from '../models/Task.js'

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo } = req.body

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id
        })

        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message})
    }
}