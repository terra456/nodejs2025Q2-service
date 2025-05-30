import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { DBService } from 'src/db.service';

@Injectable()
export class FavoriteService {
  constructor(private db: DBService) {}

  async findAll() {
    return await this.db.getAllFavorites();
  }

  async addTrack(id: UUID) {
    try {
      const track = await this.db.tracks.get(id);
      if (!track) {
        throw new Error();
      } else {
        this.db.favorites.tracks.push(id);
        return true;
      }
    } catch (error) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrack(id: UUID) {
    try {
      const ind = this.db.favorites.tracks.findIndex((el) => el === id);
      if (ind > 0) {
        this.db.favorites.tracks.splice(ind, 1);
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} is not favorite`);
    }
  }

  async addAlbum(id: UUID) {
    try {
      const album = await this.db.albums.get(id);
      if (!album) {
        throw new Error();
      } else {
        this.db.favorites.albums.push(id);
        return true;
      }
    } catch (error) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbum(id: UUID) {
    try {
      const ind = this.db.favorites.albums.findIndex((el) => el === id);
      if (ind > 0) {
        this.db.favorites.albums.splice(ind, 1);
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} is not favorite`);
    }
  }

  async addArtist(id: UUID) {
    try {
      const artist = await this.db.artists.get(id);
      if (!artist) {
        throw new Error();
      } else {
        this.db.favorites.artists.push(id);
        return true;
      }
    } catch (error) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtist(id: UUID) {
    try {
      const ind = this.db.favorites.artists.findIndex((el) => el === id);
      if (ind > 0) {
        this.db.favorites.artists.splice(ind, 1);
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} is not favorite`);
    }
  }
}
