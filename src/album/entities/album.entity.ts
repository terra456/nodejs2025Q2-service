import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class Album {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: UUID; // uuid v4

  @ApiProperty({
    type: 'string',
    example: 'Album name',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1988,
  })
  year: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'refers to Artist',
    nullable: true,
  })
  artistId: UUID | null;
}
