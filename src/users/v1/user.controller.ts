import { AuthService } from './../../auth/auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, GetUserListDTO } from './dto';
import { AllowedRoles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JWTAuthGuard } from 'src/auth/guards/auth.guard';
import { LoginUserDTO } from './dto/login-user-dto';
import { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post('')
  @UseGuards(RoleGuard)
  @AllowedRoles('ADMIN')
  @UseGuards(JWTAuthGuard)
  async handleCreateUser(@Body() body: CreateUserDTO) {
    const PASSWORD = await this.authService.getHashedString(body.password);
    body.password = PASSWORD;

    return await this.userService.createUser(body);
  }

  @Post('login')
  async handleUserLogin(@Body() body: LoginUserDTO, @Res() res: Response) {
    try {
      const userDetails = await this.userService.getUserByUserID(body);

      if (!userDetails) {
        throw new BadRequestException('Invalid Credentials');
      }

      const isValid = await this.authService.compareHashedString(
        body.password,
        userDetails.password
      );

      if (isValid === false) {
        throw new BadRequestException('Invalid Credentials');
      }

      const token = await this.authService.generateToken({
        userId: userDetails.userId,
        username: userDetails.name,
        role: userDetails.role.name,
      });

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.send({ message: 'success' });
    } catch (error) {
      Logger.error(error, 'Login Error');
      return res.status(400).send({ message: 'Invalid Credentials' });
    }
  }

  @Get('list')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(CacheInterceptor)
  async handleGetUserList(@Query() query: GetUserListDTO) {
    console.log('Function executed');
    return await this.userService.getUserList(query);
  }
}
