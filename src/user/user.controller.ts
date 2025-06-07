/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
  Put,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'node:crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all users',
    type: [User],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get single user by id',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      const user = await this.userService.findOne(id);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // @ApiBody({
  //   description: `Updates a user's password by ID`,
  //   type: UpdatePasswordDto,
  // })
  // @ApiOkResponse({
  //   description: `The user has been updated.`,
  //   type: User,
  // })
  // @ApiBadRequestResponse({
  //   description: 'Bad request. userId is invalid (not uuid)',
  // })
  // @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // async update(
  //   @Param('id', new ParseUUIDPipe()) id: UUID,
  //   @Body() updatePassword: UpdatePasswordDto,
  // ) {
  //   try {
  //     const user = await this.userService.updatePassword(id, updatePassword);
  //     if (user) {
  //       return user;
  //     }
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.userService.remove(id);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
