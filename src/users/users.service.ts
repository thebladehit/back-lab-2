import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({ where: {username: dto.username } });
    if (user) throw new BadRequestException('User with such username already exists');
    let currencyName = dto.currency;
    if (!dto.currency) currencyName = 'UAN';
    return this.prisma.user.create({
      data: {
        username: dto.username,
        currency: {
          connectOrCreate: {
            where: { name: currencyName },
            create: { name: currencyName },
          },
        },
      },
    });
  }

  public async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('No user with id: ' + id);
    return user;
  }

  public getALlUsers() {
    return this.prisma.user.findMany();
  }


  public async deleteUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('No user with id: ' + id);
    await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
