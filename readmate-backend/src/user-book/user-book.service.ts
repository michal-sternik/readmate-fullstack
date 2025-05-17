import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookWithDates } from 'src/book/types/bookwithdates.type';
import { Book } from 'src/entities/book.entity';
import { UserBook } from 'src/entities/user-book.entity';
import {
  DuplicateBookException,
  UserBookNotFoundError,
} from 'src/exceptions/exceptions';
import { UserService } from 'src/user/user.service';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepo: Repository<UserBook>,
    private readonly userService: UserService,
  ) {}

  async connectUserToBook(
    userId: number,
    book: Book,
    startDate: string,
    endDate?: string,
  ) {
    const user = await this.userService.getUserById(userId);

    const exists = await this.userBookRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: book.id },
      },
    });

    if (exists) throw new DuplicateBookException();

    const entry = this.userBookRepo.create({
      user,
      book,
      startDate,
      endDate: endDate ?? null,
      createdAt: new Date().toISOString(),
    });

    return await this.userBookRepo.save(entry);
  }

  async disconnectUserFromBook(userId: number, bookId: string) {
    //tutaj nie trzeba sprawdzac czy przypadkiem nie usuwamy cudzej relacji
    //bo automatycznie pobieramy z bazy tylko relacje oparte na naszym id
    const existing = await this.userBookRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: ['user', 'book'],
    });

    if (!existing) {
      throw new UserBookNotFoundError(userId, bookId);
    }
    await this.userBookRepo.remove(existing);
  }

  async countUsersForBook(bookId: string): Promise<number> {
    return await this.userBookRepo.count({
      where: { book: { id: bookId } },
    });
  }
  async findUserBookById(userId: number, bookId: string): Promise<UserBook> {
    const userBook = await this.userBookRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: ['user', 'book'],
    });
    if (!userBook) {
      throw new UserBookNotFoundError(userId, bookId);
    }
    return userBook;
  }
  async saveUserBook(userBook: UserBook): Promise<UserBook> {
    return await this.userBookRepo.save(userBook);
  }
  async getUserBookListPaginated(
    userId: number,
    page: number,
    itemsPerPage: number,
  ): Promise<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    items: BookWithDates[];
  }> {
    //total items
    const totalItems = await this.userBookRepo.count({
      where: { user: { id: userId } },
    });

    //total pages
    const totalPages =
      totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

    const userBooks: UserBook[] = await this.userBookRepo.find({
      where: { user: { id: userId } },
      relations: ['book'],
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      order: { createdAt: 'DESC' },
    });

    return {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage,
      items: userBooks.map((userBook) => ({
        ...userBook.book,
        startDate: userBook.startDate,
        endDate: userBook.endDate,
      })),
    };
  }
  async getUserBooksForCalendar(
    userId: number,
    month: number,
    year: number,
  ): Promise<BookWithDates[]> {
    //we do not consider books with endDate less than month -1. they won't appear in calendar anyway

    const calendarStart = dayjs(new Date(year, month - 1, 1)).format(
      'YYYY-MM-DD',
    );
    const calendarEnd = dayjs(new Date(year, month + 1, 0)).format(
      'YYYY-MM-DD',
    );

    const userBooks = await this.userBookRepo.find({
      where: [
        {
          userId,
          startDate: LessThanOrEqual(calendarEnd),
          endDate: IsNull(), // ongoing books
        },
        {
          userId,
          startDate: LessThanOrEqual(calendarEnd),
          endDate: MoreThanOrEqual(calendarStart),
        },
      ],
      relations: ['book'],
    });

    return userBooks.map((ub) => ({
      ...ub.book,
      startDate: ub.startDate,
      endDate: ub.endDate ?? undefined,
    }));
  }

  async getUserBooksWithEndDateOfSpecificYear(userId: number, year: number) {
    const startOfYear = dayjs(new Date(year, 0, 1)).format('YYYY-MM-DD');
    const endOfYear = dayjs(new Date(year, 11, 31)).format('YYYY-MM-DD');

    const userBooks = await this.userBookRepo.find({
      where: {
        user: { id: userId },
        endDate: MoreThanOrEqual(startOfYear) && LessThanOrEqual(endOfYear),
      },
      relations: ['book'],
    });

    return userBooks.map((ub) => ({
      ...ub.book,
      startDate: ub.startDate,
      endDate: ub.endDate ?? undefined,
    }));
  }
}
