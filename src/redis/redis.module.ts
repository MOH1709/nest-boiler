import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CryptoService } from 'src/services/crypto.service';

@Module({
  providers: [RedisService, CryptoService],
  exports: [RedisService, CryptoService],
})
export class RedisModule {}
