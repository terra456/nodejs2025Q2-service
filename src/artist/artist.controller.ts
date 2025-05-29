import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'node:crypto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const artist = await this.artistService.findOne(id);
      if (artist) {
        return artist;
      }
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      const artist = await this.artistService.update(id, updateArtistDto);
      if (artist) {
        return artist;
      }
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.artistService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }
}
