import { ApiProperty } from '@nestjs/swagger';
import { LoginType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
    description: 'password for login user',
    default: '12345678',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Role of the user',
    default: 'USER',
    enum: ['ADMIN', 'USER'],
  })
  @IsEmail()
  role: string;

  @ApiProperty({
    description: `Login Type ${LoginType}`,
    default: LoginType.EMAIL,
  })
  @IsEnum(LoginType)
  loginType: LoginType;
}
