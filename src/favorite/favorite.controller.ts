import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UUID } from 'crypto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const res = await this.favoriteService.findAll();
    return res;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const track = await this.favoriteService.addTrack(id);
      return track;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.favoriteService.removeTrack(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.favoriteService.addArtist(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.favoriteService.removeArtist(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.favoriteService.addAlbum(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.favoriteService.removeAlbum(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }
}
