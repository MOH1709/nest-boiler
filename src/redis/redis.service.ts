import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { customMessage } from 'src/common/constant';
import { CryptoService } from 'src/services/crypto.service';
import { RedisSetHashParams, RedisSetParams } from './interface';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor(private cryptoService: CryptoService) {}

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

  //#region Setters

  async set(params: RedisSetParams) {
    try {
      return await this.redis.set(
        params.key,
        JSON.stringify(params.value),
        'EX',
        params.ttl
      );
    } catch (error) {
      Logger.error(error, customMessage.Redis.INFO);
    }
  }

  async setHash(params: RedisSetHashParams) {
    const HASH_KEY = this.cryptoService.generateHash(params.key);

    try {
      return await this.redis.set(
        HASH_KEY,
        JSON.stringify(params.value),
        'EX',
        params.ttl
      );
    } catch (error) {
      Logger.error(error, customMessage.Redis.INFO);
    }
  }

  //#endregion

  //#region Getters

  async get(key: string): Promise<unknown | null> {
    const CACHED_DATA = await this.redis.get(key);
    return CACHED_DATA ? JSON.parse(CACHED_DATA) : null;
  }

  async getHash(key: unknown): Promise<unknown | null> {
    const HASH_KEY = this.cryptoService.generateHash(key);

    const CACHED_DATA = await this.redis.get(HASH_KEY);
    return CACHED_DATA ? JSON.parse(CACHED_DATA) : null;
  }

  //#endregion
}
