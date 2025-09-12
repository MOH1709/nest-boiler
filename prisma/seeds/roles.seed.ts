import { Logger } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';

export async function insertSeed() {
  const prisma = new PrismaClient();
  const roles: Role[] = [
    {
      id: uuidV4(),
      name: 'ADMIN',
    },
    {
      id: uuidV4(),
      name: 'USER',
    },
  ];

  try {
    await prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    });
  } catch (e) {
    Logger.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
