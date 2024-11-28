import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAllUsers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get('getAllActiveUsers')
  getAllActiveUsers() {
    return this.usersService.getAllActiveUsers();
  }
  @Get('getInActiveUsers')
  getInActiveUsers() {
    return this.usersService.getInActiveUsers();
  }
  @Get('GetUserDetailsByID/:id')
  getUserDetailsByID(@Param('id') id: number) {
    return this.usersService.getUserDetailsByID(id);
  }
  @Get('getUserCredentials/:id')
  getUserCredentials(@Param('id') id: number) {
    return this.usersService.getUserCredentials(id);
  }
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }
}
