import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        const existingAdmin = await User.findOne({ email: 'admin@example.com'})

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('Admin123', 10)

        await User.create({
            name: 'System Admin',
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
        })

        console.log('Admin user created successfully');
        await mongoose.disconnect();
        process.exit();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
}

seedAdmin();