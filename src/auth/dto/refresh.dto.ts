import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefershDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  refreshToken: string;
}
