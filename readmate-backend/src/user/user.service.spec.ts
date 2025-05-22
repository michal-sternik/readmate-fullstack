import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/exceptions/exceptions';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Gender } from 'src/auth/enums/gender.enum';
import { getAge } from 'src/utils/date.utils';

jest.mock('src/utils/date.utils', () => ({
  getAge: jest.fn().mockReturnValue(25),
}));

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByEmailOrUsername', () => {
    it('should find user by email or username', async () => {
      const user = { id: 1, username: 'test', email: 'test@test.com' } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getUserByEmailOrUsername(
        'test@test.com',
        'test',
      );

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: [{ username: 'test' }, { email: 'test@test.com' }],
      });
    });
  });

  describe('saveUser', () => {
    it('should save new user and return it', async () => {
      const dto: RegisterDto = {
        username: 'newuser',
        email: 'new@user.com',
        password: 'hashed',
        confirmPassword: 'hashed',
        gender: Gender.MALE,
        birthDate: '2000-01-01',
      };

      const savedUser = {
        id: 1,
        ...dto,
        createdAt: '2024-06-01',
        role: Role.USER,
        userBooks: [],
      } as User;
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.saveUser(dto);

      expect(result).toEqual(savedUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'newuser',
          email: 'new@user.com',
          password: 'hashed',
          createdAt: expect.any(String) as string,
        }),
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const user = { id: 1, email: 'test@test.com' } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getUserByEmail('test@test.com');

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const user = { id: 1 } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getUserById(1);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw UserNotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getUserById(999)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('getUserFrontendInfoById', () => {
    it('should return public user info', async () => {
      const user = {
        id: 1,
        username: 'username',
        email: 'username@email.com',
        createdAt: '2023-01-01',
        birthDate: '1999-01-01',
        role: Role.USER,
      } as User;

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getUserFrontendInfoById(1);

      expect(result).toEqual({
        username: 'username',
        email: 'username@email.com',
        createdAt: '2023-01-01',
        age: 25,
        role: Role.USER,
      });

      expect(getAge).toHaveBeenCalledWith('1999-01-01');
    });

    it('should throw UserNotFoundException if not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getUserFrontendInfoById(123)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });
});
