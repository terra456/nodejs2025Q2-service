import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'node:crypto';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: UUID; // uuid v4

  @ApiProperty({
    type: 'string',
    example: 'TestUser',
  })
  login: string;

  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  createdAt: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  updatedAt: number;
}
