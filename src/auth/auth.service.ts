import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userService.createUser(dto, hashedPassword);
  }

  async login(dto: LoginUserDto) {
    const user = await this.userService.getUserByUserName(dto.username);
    if (!user) throw new BadRequestException('User with such username does not exist');
    const isPasswordMath = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMath) throw new BadRequestException('Incorrect password');
    const accessToken = this.jwtService.sign({ userId: user.id, username: user.username }, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken };
  }
}
