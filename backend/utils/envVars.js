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
    redisClientUrl: process.env.REDIS_CLIENT_URL || 'redis://localhost:6379',
    upstashRedisUrl: process.env.UPSTASH_REDIS_URL || 'https://your-upstash-redis-url.upstash.io',
    metaPhoneNumberId: process.env.META_PHONE_NUMBER_ID || 'your_meta_phone_number_id',
    metaTemplateName: process.env.META_TEMPLATE_NAME || 'your_meta_template_name',
    metaLanguage: process.env.META_LANGUAGE || 'en_US',
    metaToken: process.env.META_TOKEN || 'your_meta_token',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  };