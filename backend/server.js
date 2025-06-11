import cookieParser from 'cookie-parser';
import express from 'express';
import {connectDB} from './config/db.js';
import { envVars } from './utils/envVars.js';
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: envVars.nodeEnv=== 'production' ? envVars.clientUrl : 'http://localhost:3000', // Allow requests from the client URL in production
    credentials: true, // Allow cookies to be sent
}));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})