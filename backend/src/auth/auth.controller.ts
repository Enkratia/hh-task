import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  UseInterceptors,
  Patch,
  Query,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // POST
  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user);
  }
}
