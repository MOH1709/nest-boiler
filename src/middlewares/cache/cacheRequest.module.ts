import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { CryptoService } from 'src/services/crypto.service';

@Module({
  imports: [RedisModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CacheRequestModule {}
