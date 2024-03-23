import * as bcrypt from 'bcrypt';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    let isPasswordMatch = false;

    const user = await this.usersService.findByEmailDangerously(email);

    if (!user) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    isPasswordMatch = await bcrypt.compare(pass, user.password);

    if (isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Email or password are incorrect');
  }

  async login(user: any) {
    const payload = {
      email: user.email.toLowerCase(),
      id: user.id,
    };

    return {
      user,
      backendTokens: await this.usersService.generateBackendTokens(payload),
    };
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email.toLowerCase(),
      id: user.id,
    };

    return {
      backendTokens:
        await this.usersService.generateBackendAccessToken(payload),
    };
  }
}
