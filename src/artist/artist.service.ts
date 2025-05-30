import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBService } from 'src/db.service';
import { UUID } from 'node:crypto';

@Injectable()
export class ArtistService {
  constructor(private db: DBService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.db.artists.add(createArtistDto);
  }

  async findAll() {
    return await this.db.artists.getAll();
  }

  async findOne(id: UUID) {
    const artist = await this.db.artists.get(id);
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = await this.db.artists.change(id, updateArtistDto);
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }

  async remove(id: UUID) {
    const artist = await this.db.deleteArtist(id);
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }
}
