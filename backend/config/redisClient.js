// config/redisClient.js
import Redis from 'ioredis';
import { envVars } from '../utils/envVars.js';

const redis = new Redis(envVars.upstashRedisUrl);

redis.on('connect', () => {
  console.log('✅ Connected to Redis (Upstash)');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redis;
