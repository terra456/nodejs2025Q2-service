import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  artistId: UUID | null;
  albumId: UUID | null;
}
