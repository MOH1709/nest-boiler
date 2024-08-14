import { ApiProperty } from '@nestjs/swagger';
import { LoginType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    description: 'unique user id, can be in any form',
    default: 'test@mail.com',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'user password',
    default: '12345678',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: `Login Type ${LoginType}`,
    default: LoginType.EMAIL,
  })
  @IsEnum(LoginType)
  loginType: LoginType;
}
