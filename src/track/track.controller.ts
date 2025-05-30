import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUID } from 'crypto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const track = await this.trackService.findOne(id);
      if (track) {
        return track;
      }
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const track = await this.trackService.update(id, updateTrackDto);
      if (track) {
        return track;
      }
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.trackService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
