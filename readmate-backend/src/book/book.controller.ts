import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/createbook.dto';
import { BookService } from './book.service';
import { RequestUser } from 'src/auth/types/requestUser';
import { EditReadDatesDto } from './dtos/editreaddates.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserBook } from 'src/entities/user-book.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { GuestJwtAuthGuard } from 'src/auth/guards/jwt-auth/guest-jwt-auth.guard';

@ApiBearerAuth()
@Roles(Role.USER)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary:
      'Protected route - returns books read for user for specified month and sibling months',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('calendar')
  async getUserCalendar(
    @Req() request: { user: RequestUser },
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.bookService.getUserCalendar(request.user.id, month, year);
  }

  @ApiOperation({
    summary: 'Protected route - returns statistics of reading for current user',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('statistics')
  async getUserStatistics(
    @Req() request: { user: RequestUser },
    @Query('year') year: number,
  ) {
    return this.bookService.getUserReadingStatistics(request.user.id, year);
  }

  @ApiQuery({
    name: 'langRestrict',
    required: false,
    description: 'Optional if wanted to fetch only polish',
  })
  @Roles(Role.GUEST)
  @UseGuards(GuestJwtAuthGuard, RolesGuard)
  @Get('search')
  async searchBooks(
    @Query('searchQuery') searchQuery: string,
    @Query('startIndex') startIndex: number = 0,
    @Query('langRestrict') langRestrict?: 'true' | 'false',
    @Query('maxResults') maxResults: number = 9,
  ) {
    const restrict = langRestrict === 'true';
    return this.bookService.searchGoogleBooks(
      searchQuery,
      startIndex,
      maxResults,
      restrict,
    );
  }

  @ApiOperation({
    summary: 'Protected route - Returns user book by id',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getOneUserBook(
    @Req() request: { user: RequestUser },
    @Param('id') getBookId: string,
  ) {
    return this.bookService.getOneUserBook(request.user.id, getBookId);
  }

  @ApiOperation({
    summary: 'Protected route - Returns full user book list',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Optional user ID for admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUserBookListPaginated(
    @Req() request: { user: RequestUser },
    @Query('page') page: number = 1,
    @Query('itemsPerPage') itemsPerPage: number = 6,
    @Query('userId') userId?: number, //optional parameter for admin
  ) {
    const targetUserId =
      //eslint disabled to make it easier to undestand the condition
      // eslint-disable-next-line prettier/prettier
      request.user.role === Role.ADMIN && userId ? userId : request.user.id;
    console.log(targetUserId);
    return this.bookService.getUserBookListPaginated(
      targetUserId,
      page,
      itemsPerPage,
    );
  }

  @ApiOperation({
    summary:
      'Protected route - connects book to user (and creates book if not exists)',
  })
  @ApiCreatedResponse({
    description: 'User relation to book created successfully',
    type: UserBook,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addOrConnectBookToUser(
    @Req() request: { user: RequestUser },
    @Body() createBookDto: CreateBookDto,
  ) {
    console.log(createBookDto);
    return this.bookService.addOrConnectBookToUser(
      request.user.id,
      createBookDto,
    );
  }

  @ApiOperation({
    summary: 'Protected route - modifies user read dates for book',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async editUserReadDates(
    @Req() request: { user: RequestUser },
    @Param('id') editedBookId: string,
    @Body() editedBookDto: EditReadDatesDto,
  ) {
    return this.bookService.editUserReadDates(
      request.user.id,
      editedBookId,
      editedBookDto,
    );
  }

  @ApiOperation({
    summary:
      'Protected route - deletes relation between user and book and book if no one else has it',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async removeBookFromUser(
    @Req() request: { user: RequestUser },
    @Param('id') bookId: string,
  ) {
    return this.bookService.removeBookFromUser(request.user.id, bookId);
  }
}
