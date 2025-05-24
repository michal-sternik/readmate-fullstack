import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    schema: {
      example: 1,
    },
  })
  @ApiConflictResponse({
    description: 'Conflict. Username or email already exists.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request – invalid payload (missing/invalid fields)',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Returns access token - signs in user' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(
    @Req() request: { user: { id: number } },
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const accessToken = this.authService.login(request.user.id);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      });
      return { message: 'User logged in' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Clears access token - logs user out' })
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie('accessToken');
      return { message: 'User logged out' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
