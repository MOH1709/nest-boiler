import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { onDevEnvironment } from 'src/helpers/environment.helper';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const logs = [];

    onDevEnvironment(() => logs.push['query']);

    super({
      omit: {
        user: {
          password: true,
        },
      },
      log: logs,
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log(error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.log(error);
    }
  }
}
