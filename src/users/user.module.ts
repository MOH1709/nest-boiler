import { Module } from '@nestjs/common';
import { userControllers } from './user.controller';
import { userServices } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [AuthModule, RedisModule],
  controllers: [...userControllers],
  providers: [...userServices],
  exports: [...userServices],
})
export class UsersModule {}
