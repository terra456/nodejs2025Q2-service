import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SignUpUserDto } from './dto/create-user.dto';
import { Auth } from './entities/auth.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Public } from './public.decorator';
import { RefershDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignUpUserDto })
  @ApiOkResponse({
    description: 'Successful login',
    type: [Auth],
  })
  @ApiForbiddenResponse({ description: 'Incorrect login or password' })
  signIn(@Body() signInDto: SignUpUserDto) {
    return this.authService.login(signInDto.login, signInDto.password);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successful refresh',
    type: [Auth],
  })
  @ApiForbiddenResponse({ description: 'Incorrect token' })
  @ApiBadRequestResponse({
    description: 'No refresh token',
  })
  refresh(@Body() { refreshToken }: RefershDto) {
    return this.authService.refresh(refreshToken);
  }

  @Public()
  @Post('signup')
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
    try {
      const user = await this.authService.signup(createUserDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
