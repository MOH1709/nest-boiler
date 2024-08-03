import { Module } from '@nestjs/common';
import { usersV1 } from './v1';

@Module({
  controllers: [usersV1.controller],
  providers: [usersV1.service],
})
export class UsersModule {}
