import { Module } from '@nestjs/common';
import { userControllers } from './user.controllers';
import { userServices } from './users.services';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [...userControllers],
  providers: [...userServices],
  exports: [...userServices],
})
export class UsersModule {}
