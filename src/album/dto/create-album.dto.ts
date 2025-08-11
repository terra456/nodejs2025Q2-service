import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'node:crypto';

export class CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    example: 'Innuendo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1991,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'refers to Artist',
    nullable: true,
  })
  artistId: UUID | null;
}
