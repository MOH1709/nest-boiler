import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [RedisService, DatabaseService],
  exports: [RedisService, DatabaseService],
})
export class GlobalModule {}
