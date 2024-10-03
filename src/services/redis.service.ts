import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  redis: Redis;

  constructor() {}

  onModuleInit() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });

    Logger.warn('Redis Connected Successfully', 'Redis Status');
  }

  onModuleDestroy() {
    this.redis.disconnect();
    Logger.warn('Redis Disconnected Successfully', 'Redis Status');
  }
}
