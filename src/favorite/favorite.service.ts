import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {
    this.start();
  }

  async start() {
    try {
      const favs = await this.prisma.favorites.findFirst();
      if (!favs) {
        await this.prisma.favorites.create({
          data: {
            favsArtists: [],
            favsAlbums: [],
            favsTracks: [],
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    const favs = await this.prisma.favorites.findFirst();
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favs.favsTracks } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favs.favsAlbums } },
    });
    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favs.favsArtists } },
    });
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  async addTrack(id: UUID) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      await this.prisma.favorites.updateMany({
        data: { favsTracks: { push: id } },
      });
    }
  }

  async removeTrack(id: UUID) {
    try {
      const { favsTracks } = await this.prisma.favorites.findFirst({
        select: { favsTracks: true },
      });
      await this.prisma.favorites.updateMany({
        data: { favsTracks: { set: favsTracks.filter((id) => id !== id) } },
      });
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} is not favorite`);
    }
  }

  async addAlbum(id: UUID) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      await this.prisma.favorites.updateMany({
        data: { favsAlbums: { push: id } },
      });
    }
  }

  async removeAlbum(id: UUID) {
    try {
      const { favsAlbums } = await this.prisma.favorites.findFirst({
        select: { favsAlbums: true },
      });
      await this.prisma.favorites.updateMany({
        data: { favsAlbums: { set: favsAlbums.filter((id) => id !== id) } },
      });
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} is not favorite`);
    }
  }

  async addArtist(id: UUID) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      await this.prisma.favorites.updateMany({
        data: { favsArtists: { push: id } },
      });
      return true;
    }
  }

  async removeArtist(id: UUID) {
    try {
      const { favsArtists } = await this.prisma.favorites.findFirst({
        select: {
          favsArtists: true,
        },
      });
      await this.prisma.favorites.updateMany({
        data: { favsArtists: { set: favsArtists.filter((id) => id !== id) } },
      });
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} is not favorite`);
    }
  }
}
