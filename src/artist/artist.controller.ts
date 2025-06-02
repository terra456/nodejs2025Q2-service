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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateArtistDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields.',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all artists',
    type: [Artist],
  })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get single artist by id',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
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
  @ApiBody({
    description: `Update artist information by UUID`,
    type: CreateArtistDto,
  })
  @ApiOkResponse({
    description: `The artist has been updated.`,
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
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
  @ApiNoContentResponse({ description: 'The artist has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.artistService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }
}
