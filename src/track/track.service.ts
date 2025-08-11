import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: UUID) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }

  async remove(id: UUID) {
    const track = await this.prisma.track.delete({ where: { id } });
    if (!track) {
      throw new Error('Not found');
    }
    return track;
  }
}
