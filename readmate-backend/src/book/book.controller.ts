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

@ApiBearerAuth()
@Roles(Role.USER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'Protected route - Returns user book by id',
  })
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
  @Post()
  async addOrConnectBookToUser(
    @Req() request: { user: RequestUser },
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.bookService.addOrConnectBookToUser(
      request.user.id,
      createBookDto,
    );
  }

  @ApiOperation({
    summary: 'Protected route - modifies user read dates for book',
  })
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
  @Delete(':id')
  async removeBookFromUser(
    @Req() request: { user: RequestUser },
    @Param('id') bookId: string,
  ) {
    return this.bookService.removeBookFromUser(request.user.id, bookId);
  }
}
