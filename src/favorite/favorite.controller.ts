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
import { Favorite } from './entities/favorite.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Gets all favorites movies, tracks and books',
    type: Favorite,
  })
  async findAll() {
    const res = await this.favoriteService.findAll();
    return res;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Track with id doesn't exist.`,
  })
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
  @ApiNoContentResponse({
    description: 'Deleted successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Track was not found.`,
  })
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
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Artist with id doesn't exist.`,
  })
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
  @ApiNoContentResponse({
    description: 'Deleted successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Artist was not found.`,
  })
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
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Album with id doesn't exist.`,
  })
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
  @ApiNoContentResponse({
    description: 'Deleted successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: `Album was not found.`,
  })
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
