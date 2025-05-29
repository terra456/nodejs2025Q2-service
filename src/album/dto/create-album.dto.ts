import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'node:crypto';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId: UUID | null;
}
