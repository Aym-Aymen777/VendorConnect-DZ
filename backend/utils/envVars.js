import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.resolve('./backend/.env')});

export const envVars = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
    nodeEnv: process.env.NODE_ENV ,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    cloudinaryName: process.env.CLOUD_NAME || 'your_cloudinary_name',
    cloudinaryKey: process.env.CLOUD_API_KEY || 'your_cloudinary_key',
    cloudinarySecret: process.env.CLOUD_API_SECRET || 'your_cloudinary_secret',
    uploadPreset: process.env.UPLOAD_PRESET || 'ml_default',
    googleClientId: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  };