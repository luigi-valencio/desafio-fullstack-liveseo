import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@email.com' },
    { id: 2, name: 'Pedro', email: 'pedro@email.com' },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users.map(user => ({ ...user }));
  }

  create(dto: CreateUserDto): User {
    if (this.users.some(user => user.email === dto.email)) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }
    const user: User = { id: this.nextId++, name: dto.name, email: dto.email };
    this.users.push(user);
    return { ...user };
  }
}
