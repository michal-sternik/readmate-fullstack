import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Gender } from './enums/gender.enum';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  const mockedAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('registers user and returns new user id', async () => {
      const registerDto = {
        username: 'testUsername',
        password: 'testPassword',
        confirmPassword: 'testPassword',
        email: 'testEmail@email.com',
        gender: Gender.MALE,
        birthDate: '2000-01-01',
      };
      const newUserId = 1;

      mockedAuthService.register.mockResolvedValue(newUserId);

      const result = await controller.register(registerDto);

      expect(result).toEqual(newUserId);
      expect(mockedAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });
  describe('login', () => {
    it('logs in user, sets cookie and returns message', () => {
      const userId = 1;
      const accessToken = 'testAccessToken';
      const req = { user: { id: userId } };
      const res = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockedAuthService.login.mockReturnValue(accessToken);

      const result = controller.login(req, res);

      expect(mockedAuthService.login).toHaveBeenCalledWith(userId);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.cookie).toHaveBeenCalledWith(
        'accessToken',
        accessToken,
        expect.objectContaining({
          httpOnly: true,
          secure: expect.any(Boolean) as boolean,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24,
        }),
      );
      expect(result).toEqual({ message: 'User logged in' });
    });
  });

  describe('logout', () => {
    it('clears access token cookie and returns message', () => {
      const res = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      const result = controller.logout(res);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(result).toEqual({ message: 'User logged out' });
    });
  });
});
