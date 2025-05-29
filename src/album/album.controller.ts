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

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.albumService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
}
