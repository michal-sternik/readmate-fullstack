import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { RequestUser } from 'src/auth/types/requestUser';
import { UserInfoDto } from './dtos/userinfo.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Roles(Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  // @ApiOperation({ summary: 'Hello world' })
  // @UseGuards(GuestJwtAuthGuard)
  // @Roles(Role.GUEST)
  // @Get()
  // getHello(): string {
  //   return 'Hello world from UserController!';
  // }
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Protected route - returns user information' })
  @Get()
  async getUserProfile(
    @Req() request: { user: RequestUser },
  ): Promise<UserInfoDto> {
    return this.userService.getUserFrontendInfoById(request.user.id);
  }
}
