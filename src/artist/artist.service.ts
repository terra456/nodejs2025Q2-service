import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'node:crypto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: UUID) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }

  async remove(id: UUID) {
    const artist = await this.prisma.artist.delete({ where: { id } });
    if (!artist) {
      throw new Error('Not found');
    }
    return artist;
  }
}
