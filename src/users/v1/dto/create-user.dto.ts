import { ApiProperty } from '@nestjs/swagger';
import { LoginType, UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'user name should be unique',
    default: 'mohit',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email id of user',
    default: 'test@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `Role ${UserRole}`,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: `Login Type ${LoginType}`,
    default: LoginType.EMAIL,
  })
  @IsEnum(LoginType)
  loginType: LoginType;
}
