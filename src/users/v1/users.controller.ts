import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto';
import { GetUserListDTO } from './dto/get-user-list.dto';

@Controller('v1/user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('')
  async handleCreateUser(@Body() createUser: CreateUserDTO) {
    return createUser;
  }

  @Get('list')
  async handleGetUserList(@Query() queryData: GetUserListDTO) {
    return await this.userService.getUserList(queryData);
  }
}
