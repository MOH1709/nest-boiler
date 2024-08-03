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
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

insertSeed()
  .then()
  .catch((e) => console.log(e));
