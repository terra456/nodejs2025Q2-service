import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DBService } from 'src/db.service';
import { UUID } from 'node:crypto';
import { UpdatePassword } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  async create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.db.users.add(createUserDto);
    return user;
  }

  async findAll() {
    return await this.db.users.getAll();
  }

  async findOne(id: UUID) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.db.users.get(id);
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.db.users.change(id, updateUserDto);
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }

  async updatePassword(id: UUID, updatePassword: UpdatePassword) {
    const user = await this.db.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== updatePassword.oldPassword) {
      throw new HttpException('old password is wrong', HttpStatus.FORBIDDEN);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await this.db.users.change(id, {
      password: updatePassword.newPassword,
    });
    return newUser;
  }

  async remove(id: UUID) {
    const user = await this.db.users.delete(id);
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }
}
