import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/blogRoutes';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGO_URL || '';
const PORT = process.env.PORT || 5000;

app.use("/api", route);

async function main() {
    try {
        if (!uri) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (err) {
        console.error("Error starting server:", err);
    }
}

main();
