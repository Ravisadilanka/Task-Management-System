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
        res.status(500).json({ message: 'Error creating task', error: error.message })
    }
}

export const getTasks = async (req, res) => {
    try {
        const {
            search,
            status,
            priority,
            assignedTo,
            sort,
        } = req.query;

        const filters = [];

        if (req.user.role !== "admin") {
            filters.push({
                $or: [
                    { createdBy: req.user.id },
                    { assignedTo: req.user.id },
                ],
            });
        }

        if (search) {
            filters.push({
                $or: [
                    {
                        title: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                ],
            });
        }

        if (status) {
            filters.push({
                status,
            });
        }

        if (priority) {
            filters.push({
                priority,
            });
        }

        if (assignedTo) {
            filters.push({
                assignedTo,
            });
        }

        const query =
            filters.length > 0
                ? { $and: filters }
                : {};

        let taskQuery = Task.find(query)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        switch (sort) {
            case "oldest":
                taskQuery = taskQuery.sort({
                    createdAt: 1,
                });
                break;

            case "dueDate":
                taskQuery = taskQuery.sort({
                    dueDate: 1,
                });
                break;

            case "priority":
                taskQuery = taskQuery.sort({
                    priority: 1,
                });
                break;

            default:
                taskQuery = taskQuery.sort({
                    createdAt: -1,
                });
        }

        const tasks = await taskQuery;

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate, assignegTo } = req.body

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.priority = priority ?? task.priority;
        task.status = status ?? task.status;
        task.dueDate = dueDate ?? task.dueDate;

        await task.save()

        const updatedTask = await Task.findById(req.params.id).populate('createdBy', 'name email').populate('assignedTo', 'name email')

        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }

        await task.deleteOne()
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message })
    }
}