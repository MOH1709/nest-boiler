import { Logger } from '@nestjs/common';
import { insertSeed as rolesSeed } from './roles.seed';
import { insertSeed as userSeed } from './user.seed';

(async () => {
  try {
    await rolesSeed();
    await userSeed();
  } catch (error) {
    Logger.error(error);
  }
})();
