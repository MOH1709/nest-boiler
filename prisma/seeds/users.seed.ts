import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

async function insertSeed() {
  const prisma = new PrismaClient();

  try {
    await prisma.user.upsert({
      where: { email: 'alice@prisma.io' },
      update: {},
      create: {
        loginType: 'EMAIL',
        email: 'alice@prisma.io',
        name: 'Alice',
        role: 'ADMIN',
      },
    });

    await prisma.user.upsert({
      where: { email: 'bob@prisma.io' },
      update: {},
      create: {
        loginType: 'EMAIL',
        email: 'bob@prisma.io',
        name: 'Bob',
        role: 'USER',
      },
    });
  } catch (e) {
    Logger.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

insertSeed()
  .then()
  .catch((e) => Logger.error(e, 'User seed'));
