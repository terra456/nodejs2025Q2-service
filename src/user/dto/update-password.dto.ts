import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    description: `The user's old password`,
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    description: `The user's new password`,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
