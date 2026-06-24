import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js"

//Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({ message: "User registered successfully", user, accessToken })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//Refresh Token
export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Forbidden" })
        }

        const accessToken = generateAccessToken(user._id)

        res.json({ accessToken })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
    })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}


//Logout User
export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (refreshToken) {
        const user = await User.findOne({
            refreshToken : refreshToken
        })
    }

    if (user) {
        user.refreshToken = null;
        await user.save();
    }

    res.clearCookie("refreshToken")

    res.json({ message: "Logged out successfully" })
}