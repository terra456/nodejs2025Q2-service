import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID } from 'node:crypto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlbumDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields.',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all albums',
    type: [Album],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get album by id',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const album = await this.albumService.findOne(id);
      if (album) {
        return album;
      }
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: `Update library album information by UUID`,
    type: CreateAlbumDto,
  })
  @ApiOkResponse({
    description: `The album has been updated.`,
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const album = await this.albumService.update(id, updateAlbumDto);
      if (album) {
        return album;
      }
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'The album has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.albumService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
}
