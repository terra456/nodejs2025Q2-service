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
      refreshToken: '',
    };
  }

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
