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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateTrackDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields.',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all tracks',
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get single track by id',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
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
  @ApiBody({
    description: `Update library track information by UUID`,
    type: CreateTrackDto,
  })
  @ApiOkResponse({
    description: `The track has been updated.`,
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
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
  @ApiNoContentResponse({ description: 'The track has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.trackService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
