import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { CreateBookDto } from './dtos/createbook.dto';
import { BookService } from './book.service';
import { RequestUser } from 'src/auth/types/requestUser';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

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

  @Delete(':id')
  async removeBookFromUser(
    @Req() request: { user: RequestUser },
    @Param('id') bookId: string,
  ) {
    return this.bookService.removeBookFromUser(request.user.id, bookId);
  }
}
