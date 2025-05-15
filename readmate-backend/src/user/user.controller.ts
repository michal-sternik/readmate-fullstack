import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { GuestJwtAuthGuard } from 'src/auth/guards/jwt-auth/guest-jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@ApiBearerAuth()
@Roles(Role.USER)
@Controller('user')
export class UserController {
  @ApiOperation({ summary: 'Hello world' })
  @UseGuards(GuestJwtAuthGuard)
  @Roles(Role.GUEST)
  @Get()
  getHello(): string {
    return 'Hello world from UserController!';
  }

  @ApiOperation({ summary: 'Hello world2' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('2')
  getHello2(): string {
    return 'Hello world2 from UserController!';
  }
}
