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

    this.redis.on('connect', () => {
      Logger.warn('Redis Connected Successfully', 'Redis Status');
    });

    this.redis.on('error', (e) => {
      Logger.error(e, 'Redis Status');
    });

    this.redis.on('close', () => {
      Logger.warn('Redis Disconnected', 'Redis Status');
    });
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }
}
