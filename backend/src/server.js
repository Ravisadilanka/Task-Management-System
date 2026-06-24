import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())

await connectDB();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})