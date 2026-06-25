import User from '../models/User.js'

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -refreshToken')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message })
    }
}