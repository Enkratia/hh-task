import * as bcrypt from 'bcrypt';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email.toLowerCase();

    const isExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (isExist) throw new ConflictException('This email already exist');

    const res = await this.usersRepository.save({
      email: email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
    });

    return { message: 'done' };
  }

  async findByEmailDangerously(email: string) {
    const qb = this.usersRepository
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where({ email: email.toLowerCase() });

    return await qb.getOne();
  }

  async generateBackendTokens(payload: { email: string; id: string }) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
      expiresIn: Date.now() + +process.env.JWT_ACCESS_EXPIRE_TIME,
      refreshExpiresIn: Date.now() + +process.env.JWT_REFRESH_EXPIRE_TIME,
    };
  }

  async generateBackendAccessToken(payload: { email: string; id: string }) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      }),
      expiresIn: Date.now() + +process.env.JWT_ACCESS_EXPIRE_TIME,
    };
  }
}
