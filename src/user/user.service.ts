import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DBService } from 'src/db.service';
import { UUID } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.users.add(createUserDto);
  }

  async findAll() {
    return await this.db.users.getAll();
  }

  async findOne(id: UUID) {
    const user = await this.db.users.get(id);
    if (!user) {
      throw new Error('Not found');
    }
    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    return await this.db.users.change(id, updateUserDto);
  }

  async remove(id: UUID) {
    return await this.db.users.delete(id);
  }
}
