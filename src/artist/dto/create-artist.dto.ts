import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
