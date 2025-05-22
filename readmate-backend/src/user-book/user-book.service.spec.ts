import { Test, TestingModule } from '@nestjs/testing';
import { UserBookService } from './user-book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBook } from 'src/entities/user-book.entity';
import { UserService } from 'src/user/user.service';
import { Book } from 'src/entities/book.entity';
import {
  DuplicateBookException,
  UserBookNotFoundError,
} from 'src/exceptions/exceptions';

describe('UserBookService', () => {
  let service: UserBookService;

  const mockUserBookRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  const mockUserService = {
    getUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookService,
        {
          provide: getRepositoryToken(UserBook),
          useValue: mockUserBookRepo,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<UserBookService>(UserBookService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('connectUserToBook', () => {
    it('should throw DuplicateBookException if already connected', async () => {
      const userId = 1;
      const book: Book = { id: 'book1' } as Book;

      mockUserBookRepo.findOne.mockResolvedValue(true);

      await expect(
        service.connectUserToBook(userId, book, '2023-01-01'),
      ).rejects.toThrow(DuplicateBookException);

      expect(mockUserBookRepo.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId }, book: { id: book.id } },
      });
    });

    it('should connect user to book if not already connected', async () => {
      const userId = 1;
      const book: Book = { id: 'book1' } as Book;
      const user = { id: userId };
      const entry: UserBook = {
        userId,
        bookId: book.id,
        user: user as UserBook['user'],
        book,
        startDate: '2023-01-01',
        endDate: null,
        createdAt: '2023-01-01T12:00:00Z',
      };

      mockUserService.getUserById.mockResolvedValue(user);
      mockUserBookRepo.findOne.mockResolvedValue(null);
      mockUserBookRepo.create.mockReturnValue(entry);
      mockUserBookRepo.save.mockResolvedValue(entry);

      const result = await service.connectUserToBook(
        userId,
        book,
        '2023-01-01',
      );

      expect(result).toEqual(entry);
      expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUserBookRepo.save).toHaveBeenCalledWith(entry);
    });
  });

  describe('disconnectUserFromBook', () => {
    it('should throw UserBookNotFoundError if relation not found', async () => {
      mockUserBookRepo.findOne.mockResolvedValue(null);

      await expect(service.disconnectUserFromBook(1, 'bookId')).rejects.toThrow(
        UserBookNotFoundError,
      );
    });

    it('should remove user-book relation if found', async () => {
      const relation: UserBook = {
        userId: 1,
        bookId: 'bookId',
        user: {} as UserBook['user'],
        book: {} as Book,
        startDate: '2023-01-01',
        endDate: null,
        createdAt: '2023-01-01T12:00:00Z',
      };
      mockUserBookRepo.findOne.mockResolvedValue(relation);
      mockUserBookRepo.remove.mockResolvedValue(undefined);

      await service.disconnectUserFromBook(1, 'bookId');

      expect(mockUserBookRepo.remove).toHaveBeenCalledWith(relation);
    });
  });

  describe('countUsersForBook', () => {
    it('should return number of users for book', async () => {
      mockUserBookRepo.count.mockResolvedValue(3);

      const result = await service.countUsersForBook('bookId');

      expect(result).toBe(3);
    });
  });

  describe('findUserBookById', () => {
    it('should throw UserBookNotFoundError if not found', async () => {
      mockUserBookRepo.findOne.mockResolvedValue(null);

      await expect(service.findUserBookById(1, 'bookId')).rejects.toThrow(
        UserBookNotFoundError,
      );
    });

    it('should return user-book relation if found', async () => {
      const userBook: UserBook = {
        userId: 1,
        bookId: 'bookId',
        user: {} as UserBook['user'],
        book: {} as Book,
        startDate: '2023-01-01',
        endDate: null,
        createdAt: '2023-01-01T12:00:00Z',
      };
      mockUserBookRepo.findOne.mockResolvedValue(userBook);

      const result = await service.findUserBookById(1, 'bookId');

      expect(result).toEqual(userBook);
    });
  });

  describe('saveUserBook', () => {
    it('should save user-book entity', async () => {
      const userBook: UserBook = {
        userId: 1,
        bookId: 'bookId',
        user: {} as UserBook['user'],
        book: {} as Book,
        startDate: '2023-01-01',
        endDate: null,
        createdAt: '2023-01-01T12:00:00Z',
      };
      mockUserBookRepo.save.mockResolvedValue(userBook);

      const result = await service.saveUserBook(userBook);

      expect(result).toEqual(userBook);
    });
  });

  describe('getUserBookListPaginated', () => {
    it('should return paginated user books with metadata', async () => {
      const userBooks: UserBook[] = [
        {
          userId: 1,
          bookId: 'book1',
          user: {} as UserBook['user'],
          book: { id: 'book1', title: 'book1' } as Book,
          startDate: '2023-01-01',
          endDate: '2023-02-01',
          createdAt: '2023-01-01T12:00:00Z',
        },
      ];

      mockUserBookRepo.count.mockResolvedValue(1);
      mockUserBookRepo.find.mockResolvedValue(userBooks);

      const result = await service.getUserBookListPaginated(1, 1, 10);

      expect(result).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
        items: [
          {
            id: 'book1',
            title: 'book1',
            startDate: '2023-01-01',
            endDate: '2023-02-01',
          },
        ],
      });
    });
  });

  describe('getUserBooksForCalendar', () => {
    it('should return books for calendar with correct dates', async () => {
      const userBooks: UserBook[] = [
        {
          userId: 1,
          bookId: 'book1',
          user: {} as UserBook['user'],
          book: { id: 'book1', title: 'Book1' } as Book,
          startDate: '2024-04-01',
          endDate: null,
          createdAt: '2024-04-01T12:00:00Z',
        },
        {
          userId: 1,
          bookId: 'book2',
          user: {} as UserBook['user'],
          book: { id: 'book2', title: 'Book2' } as Book,
          startDate: '2024-03-15',
          endDate: '2024-05-01',
          createdAt: '2024-03-15T12:00:00Z',
        },
      ];

      mockUserBookRepo.find.mockResolvedValue(userBooks);

      const result = await service.getUserBooksForCalendar(1, 4, 2024);

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({
        id: 'book1',
        title: 'Book1',
        startDate: '2024-04-01',
        endDate: undefined,
      });
    });
  });

  describe('getUserBooksWithEndDateOfSpecificYear', () => {
    it('should return books finished in given year', async () => {
      const userBooks: UserBook[] = [
        {
          userId: 1,
          bookId: 'book2024',
          user: {} as UserBook['user'],
          book: { id: 'book2024', title: 'Book2024' } as Book,
          startDate: '2024-01-10',
          endDate: '2024-05-15',
          createdAt: '2024-01-10T12:00:00Z',
        },
      ];

      mockUserBookRepo.find.mockResolvedValue(userBooks);

      const result = await service.getUserBooksWithEndDateOfSpecificYear(
        1,
        2024,
      );

      expect(result).toEqual([
        {
          id: 'book2024',
          title: 'Book2024',
          startDate: '2024-01-10',
          endDate: '2024-05-15',
        },
      ]);
    });
  });
});
