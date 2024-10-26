import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  createUser(@Body('userName') userName: string) {
    return this.usersService.createUser(userName);
  }

  @Get('users')
  getAllUsers() {
    return this.usersService.getALlUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete('user/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
