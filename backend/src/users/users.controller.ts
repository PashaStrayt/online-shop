import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersService } from './users.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthResponseType } from './types/auth-response.type';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('login')
  async login(@Body() dto: AuthUserDto): Promise<AuthResponseType> {
    const token = await this.userService.login(dto);
    return { token };
  }

  @Post('registration')
  async register(@Body() dto: AuthUserDto): Promise<AuthResponseType> {
    const token = await this.userService.register(dto);
    return { token };
  }
}