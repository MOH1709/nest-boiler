import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from 'src/redis/redis.service';
import { CryptoService } from 'src/services/crypto.service';
import { Redis, RedisCustomRequestKey } from './interface';
import { Request } from 'express';
import { CustomMessage } from 'src/helpers/global.helper';

@Injectable()
export class CacheRequestInterceptor implements NestInterceptor {
  constructor(
    private redisService: RedisService,
    private cryptoService: CryptoService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest() as Request;
    const customValue: RedisCustomRequestKey | undefined =
      request[Redis.API_CUSTOM_KEY];

    const payload = Object.keys(request.body).length
      ? request.body
      : request.query;

    if (Object.keys(payload).length === 0) {
      Logger.warn('No key found for caching !', CustomMessage.Redis.NO_KEY);
      return next.handle();
    }

    const hash = this.cryptoService.generateHash(payload);
    const cachedData = await this.redisService.redis.get(hash);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    return next
      .handle()
      .pipe(
        tap(
          async (response) =>
            await this.redisService.redis.set(
              hash,
              JSON.stringify(response),
              'EX',
              customValue?.ttl ?? 5
            )
        )
      );
  }
}
