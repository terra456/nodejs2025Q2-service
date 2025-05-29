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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userService.updatePassword(id, updatePassword);
      if (user) {
        return user;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    try {
      await this.userService.remove(id);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
