import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/exceptions/exceptions';
import { Repository } from 'typeorm';

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

  //   async getUserWithBooksById(id: number): Promise<SafeUserDto> {
  //     const user = await this.userRepository.findOne({
  //       where: { id },
  //       relations: ['userBooks'],
  //     });
  //     if (!user) {
  //       throw new UserNotFoundException(id);
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...safeUser } = user;
  //     return safeUser;
  //   }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
