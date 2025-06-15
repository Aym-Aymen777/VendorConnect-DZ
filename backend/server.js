import cookieParser from 'cookie-parser';
import express from 'express';
import {connectDB} from './config/db.js';
import { envVars } from './utils/envVars.js';
import cors from 'cors';

import { authRoutes } from './routes/auth.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { chatRoutes } from './routes/chat.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { quotationRoutes } from './routes/quotation.routes.js';
import { adRoutes } from './routes/ad.routes.js';
import { subscribtionRoutes } from './routes/subscribtion.routes.js';
import { adminRoutes } from './routes/admin.routes.js';

// import the cron job to start it
import {expireOldAdsJob} from "./utils/cronJobs/adExpired.js";
import { planExpiredJob } from './utils/cronJobs/planExpired.js';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: envVars.nodeEnv=== 'production' ? envVars.clientUrl : 'http://localhost:3100', // Allow requests from the client URL in production
    credentials: true, // Allow cookies to be sent
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/ads",adRoutes);
app.use("/api/v1/subscription", subscribtionRoutes);
app.use("/api/v1/quotation", quotationRoutes);
app.use("/api/v1/admin",adminRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    expireOldAdsJob();
    planExpiredJob();
})