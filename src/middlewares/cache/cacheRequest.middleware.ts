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
import { Request } from 'express';
import { RedisCustomRequestKey } from 'src/common/interface';
import { ApiCustomKey } from 'src/common/enum';
import { customMessage } from 'src/common/constant';

@Injectable()
export class CacheRequestInterceptor implements NestInterceptor {
  readonly DEFAULT_TTL = 300;

  constructor(private redisService: RedisService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest() as Request;
    const customValue: RedisCustomRequestKey | undefined =
      request[ApiCustomKey.REDIS];

    const payload = Object.keys(request.body).length
      ? request.body
      : request.query;

    if (Object.keys(payload).length === 0) {
      Logger.warn('No key found for caching !', customMessage.Redis.INFO);
      return next.handle();
    }

    const cachedData = await this.redisService.getHash(payload);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(
        async (response) =>
          await this.redisService.setHash({
            key: payload,
            value: response,
            ttl: customValue?.ttl ?? this.DEFAULT_TTL,
          })
      )
    );
  }
}
