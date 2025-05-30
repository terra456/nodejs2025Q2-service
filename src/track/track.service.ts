import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DBService } from 'src/db.service';
import { UUID } from 'node:crypto';

@Injectable()
export class TrackService {
  constructor(private db: DBService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.db.tracks.add(createTrackDto);
  }

  async findAll() {
    return await this.db.tracks.getAll();
  }

  async findOne(id: UUID) {
    const track = await this.db.tracks.get(id);
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = await this.db.tracks.change(id, updateTrackDto);
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }

  async remove(id: UUID) {
    const track = await this.db.deleteTrack(id);
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }
}
