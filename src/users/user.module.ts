import { Module } from '@nestjs/common';
import { userControllers } from './user.controller';
import { userServices } from './users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [...userControllers],
  providers: [...userServices],
  exports: [...userServices],
})
export class UsersModule {}
