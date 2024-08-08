import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, GetUserListDTO } from './dto';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async handleCreateUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Get('list')
  async handleGetUserList(@Query() query: GetUserListDTO) {
    return await this.userService.getUserList(query);
  }
}
