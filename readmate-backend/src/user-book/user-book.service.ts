import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookWithDates } from 'src/book/types/bookwithdates.type';
import { Book } from 'src/entities/book.entity';
import { UserBook } from 'src/entities/user-book.entity';
import { UserBookNotFoundError } from 'src/exceptions/exceptions';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

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

    if (exists) return exists;

    const entry = this.userBookRepo.create({
      user,
      book,
      startDate,
      endDate: endDate ?? null,
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
}
