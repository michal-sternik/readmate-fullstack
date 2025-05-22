import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/exceptions/exceptions';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dtos/userinfo.dto';
import { getAge } from 'src/utils/date.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmailOrUsername(email: string, username: string) {
    return await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
  }

  async saveUser(registerDtoWithHashedPassword: RegisterDto) {
    const user = new User();
    Object.assign(user, {
      ...registerDtoWithHashedPassword,
      createdAt: new Date().toISOString().split('T')[0],
    });

    return await this.userRepository.save(user);
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }

  async getUserFrontendInfoById(id: number): Promise<UserInfoDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }

    const returnUser: UserInfoDto = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      age: getAge(user.birthDate),
      role: user.role,
    };

    return returnUser;
  }
}
