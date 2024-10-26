import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../utils/utils';

export interface User {
  id: string;
  userName: string;
}

@Injectable()
export class UsersService {
  private usersStorage: User[] = [];

  public createUser(userName: string) {
    if (!userName) throw new BadRequestException('Provide username');
    const id = generateId();
    this.usersStorage.push({ userName, id });
    return this.usersStorage[this.usersStorage.length - 1];
  }

  public getUserById(id: string) {
    const user = this.usersStorage.find(user => user.id === id);
    if (!user) throw new NotFoundException('No user with id: ' + id);
    return user;
  }

  public getALlUsers() {
    return this.usersStorage;
  }

  public deleteUserById(id: string) {
    const user = this.usersStorage.find(user => user.id === id);
    if (!user) throw new NotFoundException('No user with id: ' + id);
    this.usersStorage = this.usersStorage.filter(user => user.id !== id);
    return user;
  }
}
