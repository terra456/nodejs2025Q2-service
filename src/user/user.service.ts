import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'node:crypto';
import { UpdatePassword } from 'src/types/types';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(createUserDto.password, salt);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.create({
      data: {
        createdAt: Math.floor(Date.now() / 1000) >>> 0,
        updatedAt: Math.floor(Date.now() / 1000) >>> 0,
        version: 1,
        login: createUserDto.login,
        password: hashPassword,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: UUID) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }

  async findByLogin(login: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.prisma.user.findFirst({
      where: { login },
    });
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }

  async updatePassword(id: UUID, updatePassword: UpdatePassword) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (!bcrypt.compareSync(updatePassword.oldPassword, user.password)) {
      throw new HttpException('old password is wrong', HttpStatus.FORBIDDEN);
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(updatePassword.newPassword, salt);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await this.prisma.user.update({
      where: { id },
      data: {
        version: user.version + 1,
        updatedAt: Math.ceil(Date.now() / 1000) >>> 0,
        password: hashPassword,
      },
    });
    return newUser;
  }

  async remove(id: UUID) {
    const user = await this.prisma.user.delete({ where: { id } });
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }
}
