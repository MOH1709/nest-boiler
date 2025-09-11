import { Logger } from '@nestjs/common';
import { LoginType, PrismaClient, User } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

async function insertSeed() {
  const prisma = new PrismaClient();

  const role = await prisma.role.findFirst({
    where: {},
  });

  const hashedPassword = await bcrypt.hash('12345678', 10);

  const users: User[] = [
    {
      id: uuidV4(),
      name: 'ADMIN',
      loginType: LoginType.EMAIL,
      password: hashedPassword,
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
