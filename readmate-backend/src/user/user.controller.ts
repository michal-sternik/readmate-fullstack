import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { GuestJwtAuthGuard } from 'src/auth/guards/jwt-auth/guest-jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hello world' })
  @UseGuards(GuestJwtAuthGuard, RolesGuard)
  @Roles(Role.GUEST)
  //   @UseGuards(RolesGuard)
  @Get()
  getHello(): string {
    return 'Hello world from UserController!';
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hello world2' })
  @UseGuards(JwtAuthGuard)
  @Get('2')
  getHello2(): string {
    return 'Hello world2 from UserController!';
  }
}
