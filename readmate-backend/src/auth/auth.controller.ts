import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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
    return await this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Returns access token - signs in user' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() request: { user: { id: number } }) {
    return this.authService.login(request.user.id);
  }
}
