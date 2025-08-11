import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'node:crypto';

export class Artist {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: UUID;

  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
  })
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
  })
  grammy: boolean;
}
