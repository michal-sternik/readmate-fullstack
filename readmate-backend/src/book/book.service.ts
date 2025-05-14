import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/createbook.dto';
import { UserBookService } from 'src/user-book/user-book.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    private readonly userService: UserService,
    private readonly userBookService: UserBookService,
  ) {}

  async addOrConnectBookToUser(userId: number, dto: CreateBookDto) {
    let book = await this.bookRepo.findOne({ where: { title: dto.title } });

    if (!book) {
      book = this.bookRepo.create({
        title: dto.title,
        description: dto.description,
        authors: dto.authors,
        categories: dto.categories,
        pageCount: dto.pageCount,
        publishedDate: dto.publishedDate?.toISOString() ?? null,
      });
      book = await this.bookRepo.save(book);
    }

    await this.userBookService.connectUserToBook(
      userId,
      book,
      dto.startDate.toISOString(),
      dto.endDate?.toISOString() ?? undefined,
    );

    return book;
  }

  async removeBookFromUser(userId: number, bookId: string) {
    await this.userBookService.disconnectUserFromBook(userId, bookId);

    const howMany = await this.userBookService.countUsersForBook(bookId);
    if (howMany === 0) {
      await this.bookRepo.delete(bookId);
    }

    return { success: true };
  }

  async findOrFailById(id: string): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new Error('Book not found');
    return book;
  }
}
