import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorite {
  @ApiProperty({
    type: [Artist],
    example: Artist,
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
    example: Album,
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
    example: Track,
  })
  tracks: Track[];
}
