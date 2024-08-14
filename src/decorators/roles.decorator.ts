import { SetMetadata } from '@nestjs/common';

export const setRoles = (...roles: string[]) => SetMetadata('roles', roles);
