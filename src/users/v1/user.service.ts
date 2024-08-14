import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO, GetUserListDTO } from './dto';
import { LoginUserDTO } from './dto/login-user-dto';

@Injectable()
export class UserService {
  private userModel: PrismaClient['user'];

  constructor(private databaseService: DatabaseService) {
    this.userModel = this.databaseService.user;
  }

  async createUser(data: CreateUserDTO) {
    return await this.userModel.create({
      data: {
        name: data.name,
        userId: data.email,
        password: data.password,
        loginType: data.loginType,
        role: {
          connect: {
            name: data.role,
          },
        },
      },
    });
  }

  async getUserByUserID(data: LoginUserDTO) {
    const { userId: USER_ID } = data;

    return await this.userModel.findFirst({
      where: {
        userId: USER_ID,
      },
      select: {
        password: true,
      },
    });
  }

  async getUserList(data: GetUserListDTO) {
    const { limit: LIMIT, page: PAGE } = data;

    return await this.userModel.findMany({
      take: LIMIT,
      skip: (PAGE - 1) * LIMIT,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
