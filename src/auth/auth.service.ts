import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<Auth> {
    const user = await this.usersService.findByLogin(login);
    if (!user || bcrypt.compareSync(user.password, password)) {
      throw new HttpException(
        'Incorrect login or password',
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async refresh(refreshToken: string) {
    try {
      const user = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      if (!user) {
        throw new HttpException('Incorrect token', HttpStatus.FORBIDDEN);
      }
      const payload = { userId: user.userId, login: user.login };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch {
      throw new HttpException('Incorrect token', HttpStatus.FORBIDDEN);
    }
  }
}
