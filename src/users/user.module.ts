import { Module } from '@nestjs/common';
import { userControllers } from './user.controllers';
import { userServices } from './users.services';

@Module({
  controllers: [...userControllers],
  providers: [...userServices],
})
export class UsersModule {}
