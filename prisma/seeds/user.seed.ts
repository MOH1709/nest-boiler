import { Logger } from '@nestjs/common';
import { LoginType, PrismaClient, User } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';

async function insertSeed() {
  const prisma = new PrismaClient();

  const role = await prisma.role.findFirst({
    where: {},
  });

  const users: User[] = [
    {
      id: uuidV4(),
      name: 'ADMIN',
      loginType: LoginType.EMAIL,
      password: '12345678',
      userId: 'admin@mail.com',
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // {
    //   id: uuidV4(),
    //   name: 'USER',
    // },
  ];

  try {
    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  } catch (e) {
    Logger.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

insertSeed()
  .then()
  .catch((e) => Logger.error(e, 'Users role seed'));
