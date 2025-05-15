import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/createbook.dto';
import { UserBookService } from 'src/user-book/user-book.service';
import { BookWithDates } from './types/bookwithdates.type';
import { EditReadDatesDto } from './dtos/editreaddates.dto';

const MINUTES_PER_PAGE = 2; //average world reading speed

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    private readonly userService: UserService,
    private readonly userBookService: UserBookService,
  ) {}

  async addOrConnectBookToUser(userId: number, createBookDto: CreateBookDto) {
    let book = await this.bookRepo.findOne({
      where: { title: createBookDto.title },
    });

    if (!book) {
      book = this.bookRepo.create({
        ...createBookDto,
        publishedDate: createBookDto.publishedDate
          ? dayjs(createBookDto.publishedDate).toISOString()
          : null,
      });
      book = await this.bookRepo.save(book);
    }

    const newUserBook = await this.userBookService.connectUserToBook(
      userId,
      book,
      dayjs(createBookDto.startDate).toISOString(),
      createBookDto.endDate
        ? dayjs(createBookDto.endDate).toISOString()
        : undefined,
    );

    return { bookId: newUserBook.bookId };
  }

  async removeBookFromUser(userId: number, bookId: string) {
    await this.userBookService.disconnectUserFromBook(userId, bookId);

    const howMany = await this.userBookService.countUsersForBook(bookId);
    if (howMany === 0) {
      await this.bookRepo.delete(bookId);
    }

    return { success: true };
  }

  async editUserReadDates(
    id: number,
    editedBookId: string,
    editedBookDto: EditReadDatesDto,
  ) {
    const userBook = await this.userBookService.findUserBookById(
      id,
      editedBookId,
    );
    Object.assign(userBook, editedBookDto);
    return await this.userBookService.saveUserBook(userBook);
  }
  async getOneUserBook(userId: number, bookId: string) {
    const userBook = await this.userBookService.findUserBookById(
      userId,
      bookId,
    );
    const bookWithDates: BookWithDates = {
      ...userBook.book,
      startDate: userBook.startDate,
      endDate: userBook.endDate ?? undefined,
    };
    return bookWithDates;
  }
  async getUserBookListPaginated(
    userId: number,
    page: number,
    itemsPerPage: number,
  ) {
    const userBooks = await this.userBookService.getUserBookListPaginated(
      userId,
      page,
      itemsPerPage,
    );
    return userBooks;
  }
  async getUserCalendar(userId: number, month: number, year: number) {
    const books = await this.userBookService.getUserBooksForCalendar(
      userId,
      month,
      year,
    );

    return books;
  }

  async getUserReadingStatistics(userId: number, year: number) {
    const booksReadThisYear =
      await this.userBookService.getUserBooksWithEndDateOfSpecificYear(
        userId,
        year,
      );

    const hoursRead = booksReadThisYear.reduce((sum, book) => {
      if (!book.pageCount || book.pageCount === null) return sum;
      return sum + book.pageCount * MINUTES_PER_PAGE;
    }, 0);

    return {
      numbersOfBookRead: booksReadThisYear.length,
      hoursRead: Math.round(hoursRead / 60),
    };
  }
}
