import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({
    type: 'string',
    example: 'TestUser',
    description: 'Username',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'Password',
  })
  @IsNotEmpty()
  password: string;
}
