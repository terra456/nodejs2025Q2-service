import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: UUID) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }

  async remove(id: UUID) {
    const album = await this.prisma.album.delete({ where: { id } });
    if (!album) {
      throw new Error('Not found');
    }
    return album;
  }
}
