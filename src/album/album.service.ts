import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBService } from 'src/db.service';
import { UUID } from 'node:crypto';

@Injectable()
export class AlbumService {
  constructor(private db: DBService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.db.albums.add(createAlbumDto);
  }

  async findAll() {
    return await this.db.albums.getAll();
  }

  async findOne(id: UUID) {
    const album = await this.db.albums.get(id);
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.db.albums.change(id, updateAlbumDto);
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }

  async remove(id: UUID) {
    const album = await this.db.albums.delete(id);
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }
}
