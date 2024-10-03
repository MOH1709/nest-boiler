import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
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
      Logger.warn('DB Connected Successfully', 'DB Status');
    } catch (error) {
      Logger.error(error, 'DB Status');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      Logger.warn('DB Disconnected', 'DB Status');
    } catch (error) {
      Logger.log(error, 'DB Status');
    }
  }
}
