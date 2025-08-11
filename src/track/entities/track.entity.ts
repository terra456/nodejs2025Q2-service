import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'node:crypto';

export class Track {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: UUID; // uuid v4

  @ApiProperty({
    type: 'string',
    example: 'Bohemian Rhapsody',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true,
  })
  artistId: UUID | null; // refers to Artist

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true,
  })
  albumId: UUID | null; // refers to Album

  @ApiProperty({
    type: 'number',
    example: 355,
    description: 'In seconds',
  })
  duration: number; // integer number
}
