import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { GetUserListDTO } from './dto/get-user-list.dto';

@Injectable()
export class UsersService {
  private userModel: PrismaClient['user'];

  constructor(databaseService: DatabaseService) {
    this.userModel = databaseService.user;
  }

  async getUserList(queryData: GetUserListDTO) {
    const { limit: LIMIT, page: PAGE } = queryData;

    return await this.userModel.findMany({
      take: LIMIT,
      skip: (PAGE - 1) * LIMIT,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
