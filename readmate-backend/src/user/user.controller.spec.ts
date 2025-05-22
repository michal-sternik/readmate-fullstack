import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInfoDto } from './dtos/userinfo.dto';
import { Role } from 'src/auth/enums/role.enum';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    getUserFrontendInfoById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should return user info', async () => {
      const userId = 1;
      const userInfo: UserInfoDto = {
        username: 'testuser',
        email: 'test@email.com',
        age: 25,
        createdAt: '2024-01-10T12:00:00Z',
        role: Role.USER,
      };
      mockUserService.getUserFrontendInfoById.mockResolvedValue(userInfo);

      const req = { user: { id: userId, role: userInfo.role } };
      const result = await controller.getUserProfile(req);

      expect(result).toEqual(userInfo);
      expect(mockUserService.getUserFrontendInfoById).toHaveBeenCalledWith(
        userId,
      );
    });
  });
});
