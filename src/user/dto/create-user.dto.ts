import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'TestUser',
    description: 'Username',
  })
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
