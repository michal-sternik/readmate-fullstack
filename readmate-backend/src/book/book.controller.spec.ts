import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Role } from 'src/auth/enums/role.enum';
import { CreateBookDto } from './dtos/createbook.dto';
import { EditReadDatesDto } from './dtos/editreaddates.dto';

describe('BookController', () => {
  let controller: BookController;

  const mockedBookService = {
    getUserCalendar: jest.fn(),
    getUserReadingStatistics: jest.fn(),
    searchGoogleBooks: jest.fn(),
    getOneUserBook: jest.fn(),
    getUserBookListPaginated: jest.fn(),
    addOrConnectBookToUser: jest.fn(),
    editUserReadDates: jest.fn(),
    removeBookFromUser: jest.fn(),
  };

  const mockUser = {
    id: 1,
    role: Role.USER,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockedBookService }],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserCalendar', () => {
    it('should return calendar data for user', async () => {
      const result = ['calendarData'];
      mockedBookService.getUserCalendar.mockResolvedValue(result);

      const data = await controller.getUserCalendar(
        { user: mockUser },
        5,
        2024,
      );

      expect(data).toEqual(result);
      expect(mockedBookService.getUserCalendar).toHaveBeenCalledWith(
        1,
        5,
        2024,
      );
    });
  });

  describe('getUserStatistics', () => {
    it('should return statistics data for user', async () => {
      const result = { totalBooks: 10 };
      mockedBookService.getUserReadingStatistics.mockResolvedValue(result);

      const data = await controller.getUserStatistics({ user: mockUser }, 2024);

      expect(data).toEqual(result);
      expect(mockedBookService.getUserReadingStatistics).toHaveBeenCalledWith(
        1,
        2024,
      );
    });
  });

  describe('searchBooks', () => {
    it('should search books via Google Books API', async () => {
      const result = [{ title: 'testBook' }];
      mockedBookService.searchGoogleBooks.mockResolvedValue(result);

      const data = await controller.searchBooks('test', 0, 'true', 9);

      expect(data).toEqual(result);
      expect(mockedBookService.searchGoogleBooks).toHaveBeenCalledWith(
        'test',
        0,
        9,
        true,
      );
    });
  });

  describe('getOneUserBook', () => {
    it('should return specific user book by id', async () => {
      const book = { title: 'testBook' };
      mockedBookService.getOneUserBook.mockResolvedValue(book);

      const data = await controller.getOneUserBook(
        { user: mockUser },
        'bookId',
      );

      expect(data).toEqual(book);
      expect(mockedBookService.getOneUserBook).toHaveBeenCalledWith(
        1,
        'bookId',
      );
    });
  });

  describe('getUserBookListPaginated', () => {
    it('should return paginated book list for user', async () => {
      const books = ['book1', 'book2'];
      mockedBookService.getUserBookListPaginated.mockResolvedValue(books);

      const data = await controller.getUserBookListPaginated(
        { user: mockUser },
        1,
        6,
        undefined,
      );

      expect(data).toEqual(books);
      expect(mockedBookService.getUserBookListPaginated).toHaveBeenCalledWith(
        1,
        1,
        6,
      );
    });

    it('should allow admin to specify userId', async () => {
      const books = ['book1'];
      const adminUser = { id: 99, role: Role.ADMIN };
      mockedBookService.getUserBookListPaginated.mockResolvedValue(books);

      const data = await controller.getUserBookListPaginated(
        { user: adminUser },
        1,
        6,
        1,
      );

      expect(data).toEqual(books);
      expect(mockedBookService.getUserBookListPaginated).toHaveBeenCalledWith(
        1,
        1,
        6,
      );
    });
  });

  describe('addOrConnectBookToUser', () => {
    it('should connect or create book and link to user', async () => {
      const dto: CreateBookDto = {
        title: 'Test',
        authors: ['Author'],
        id: '123',
        startDate: '2022-01-01',
      };
      const response = { bookId: '123' };
      mockedBookService.addOrConnectBookToUser.mockResolvedValue(response);

      const data = await controller.addOrConnectBookToUser(
        { user: mockUser },
        dto,
      );

      expect(data).toEqual(response);
      expect(mockedBookService.addOrConnectBookToUser).toHaveBeenCalledWith(
        1,
        dto,
      );
    });
  });

  describe('editUserReadDates', () => {
    it('should edit read dates of book', async () => {
      const dto: EditReadDatesDto = {
        startDate: '2022-01-01',
        endDate: '2022-02-01',
      };
      const response = { success: true };
      mockedBookService.editUserReadDates.mockResolvedValue(response);

      const data = await controller.editUserReadDates(
        { user: mockUser },
        'bookId',
        dto,
      );

      expect(data).toEqual(response);
      expect(mockedBookService.editUserReadDates).toHaveBeenCalledWith(
        1,
        'bookId',
        dto,
      );
    });
  });

  describe('removeBookFromUser', () => {
    it('should remove book from user', async () => {
      const response = { deleted: true };
      mockedBookService.removeBookFromUser.mockResolvedValue(response);

      const data = await controller.removeBookFromUser(
        { user: mockUser },
        'bookId',
      );

      expect(data).toEqual(response);
      expect(mockedBookService.removeBookFromUser).toHaveBeenCalledWith(
        1,
        'bookId',
      );
    });
  });
});
