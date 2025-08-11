import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTrackDto {
  @ApiProperty({
    type: 'string',
    example: 'Bohemian Rhapsody',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'number',
    example: 355,
    description: 'In seconds',
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'refers to Artist',
    nullable: true,
  })
  artistId: UUID | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'refers to Album',
    nullable: true,
  })
  albumId: UUID | null;
}
