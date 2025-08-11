import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    type: 'string',
    description: 'JWT Token',
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
    description: 'JWT Token',
  })
  refreshToken: string;
}
