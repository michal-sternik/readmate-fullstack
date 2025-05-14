import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { UserBook } from 'src/entities/user-book.entity';
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

    // sprawdz czy już istnieje
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
    const existing = await this.userBookRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: ['user', 'book'],
    });

    if (existing) {
      await this.userBookRepo.remove(existing);
    }
  }

  async countUsersForBook(bookId: string): Promise<number> {
    return await this.userBookRepo.count({
      where: { book: { id: bookId } },
    });
  }
}
