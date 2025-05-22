import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { UserService } from 'src/user/user.service';
import { UserBookService } from 'src/user-book/user-book.service';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { CreateBookDto } from './dtos/createbook.dto';
import { EditReadDatesDto } from './dtos/editreaddates.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookService', () => {
  let service: BookService;

  const mockBookRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserService = {};

  const mockUserBookService = {
    connectUserToBook: jest.fn(),
    disconnectUserFromBook: jest.fn(),
    countUsersForBook: jest.fn(),
    findUserBookById: jest.fn(),
    saveUserBook: jest.fn(),
    getUserBookListPaginated: jest.fn(),
    getUserBooksForCalendar: jest.fn(),
    getUserBooksWithEndDateOfSpecificYear: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getRepositoryToken(Book), useValue: mockBookRepo },
        { provide: UserService, useValue: mockUserService },
        { provide: UserBookService, useValue: mockUserBookService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addOrConnectBookToUser', () => {
    it('should connect to existing book', async () => {
      const book = { id: '1', title: 'test' } as Book;
      const dto: CreateBookDto = {
        id: '1',
        title: 'test',
        authors: [],
        startDate: '2020-01-01',
      };
      const userBook = { bookId: '1' };

      mockBookRepo.findOne.mockResolvedValue(book);
      mockUserBookService.connectUserToBook.mockResolvedValue(userBook);

      const result = await service.addOrConnectBookToUser(1, dto);

      expect(result).toEqual({ bookId: '1' });
      expect(mockBookRepo.findOne).toHaveBeenCalledWith({
        where: { title: 'test' },
      });
      expect(mockUserBookService.connectUserToBook).toHaveBeenCalled();
    });

    it('should create new book and connect', async () => {
      const dto: CreateBookDto = {
        id: '2',
        title: 'new book',
        authors: ['Author'],
        publishedDate: '2020-01-01',
        startDate: '2020-01-01',
      };
      const savedBook = { id: '2', title: 'new book' } as Book;
      const userBook = { bookId: '2' };

      mockBookRepo.findOne.mockResolvedValue(null);
      mockBookRepo.create.mockReturnValue(savedBook);
      mockBookRepo.save.mockResolvedValue(savedBook);
      mockUserBookService.connectUserToBook.mockResolvedValue(userBook);

      const result = await service.addOrConnectBookToUser(1, dto);

      expect(mockBookRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...dto,
          publishedDate: dayjs(dto.publishedDate).toISOString(),
        }),
      );
      expect(result).toEqual({ bookId: '2' });
    });
  });

  describe('removeBookFromUser', () => {
    it('should delete book if no one else has it', async () => {
      mockUserBookService.disconnectUserFromBook.mockResolvedValue(undefined);
      mockUserBookService.countUsersForBook.mockResolvedValue(0);
      mockBookRepo.delete.mockResolvedValue(undefined);

      const result = await service.removeBookFromUser(1, 'bookId');

      expect(result).toEqual({ success: true });
      expect(mockBookRepo.delete).toHaveBeenCalledWith('bookId');
    });

    it('should NOT delete book if others still have it', async () => {
      mockUserBookService.disconnectUserFromBook.mockResolvedValue(undefined);
      mockUserBookService.countUsersForBook.mockResolvedValue(2);

      const result = await service.removeBookFromUser(1, 'bookId');

      expect(mockBookRepo.delete).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });
  });

  describe('editUserReadDates', () => {
    it('should edit and save read dates', async () => {
      const dto: EditReadDatesDto = {
        startDate: '2020-02-01',
        endDate: '2020-03-01',
      };

      const userBook = {
        userId: 1,
        bookId: 'bookId',
        startDate: '2020-01-01',
        endDate: null,
      };
      mockUserBookService.findUserBookById.mockResolvedValue(userBook);
      mockUserBookService.saveUserBook.mockResolvedValue({
        ...userBook,
        ...dto,
      });

      const result = await service.editUserReadDates(1, 'bookId', dto);

      expect(result).toEqual(expect.objectContaining(dto));
    });
  });

  describe('getOneUserBook', () => {
    it('should return user book with dates', async () => {
      const userBook = {
        book: { title: 'testBook', pageCount: 100 },
        startDate: '2023-01-01',
        endDate: '2023-02-01',
      };
      mockUserBookService.findUserBookById.mockResolvedValue(userBook);

      const result = await service.getOneUserBook(1, 'bookId');

      expect(result).toEqual({
        ...userBook.book,
        startDate: userBook.startDate,
        endDate: userBook.endDate,
      });
    });
  });

  describe('getUserBookListPaginated', () => {
    it('should return paginated user books', async () => {
      const books = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 2,
        items: [
          {
            id: '1',
            title: 'Book1',
            startDate: '2023-01-01',
            endDate: '2023-02-01',
          },
          {
            id: '2',
            title: 'Book2',
            startDate: '2023-03-01',
            endDate: null,
          },
        ],
      };
      mockUserBookService.getUserBookListPaginated.mockResolvedValue(books);

      const result = await service.getUserBookListPaginated(1, 1, 2);

      expect(result).toEqual(books);
    });
  });

  describe('getUserCalendar', () => {
    it('should return calendar books', async () => {
      const books = [
        {
          id: '1',
          title: 'CalendarBook',
          startDate: '2024-05-01',
          endDate: null,
        },
      ];
      mockUserBookService.getUserBooksForCalendar.mockResolvedValue(books);

      const result = await service.getUserCalendar(1, 5, 2024);

      expect(result).toEqual(books);
    });
  });

  describe('getUserReadingStatistics', () => {
    it('should calculate and return reading statistics', async () => {
      const books = [
        { pageCount: 100 },
        { pageCount: 150 },
        { pageCount: null },
      ];
      mockUserBookService.getUserBooksWithEndDateOfSpecificYear.mockResolvedValue(
        books,
      );

      const result = await service.getUserReadingStatistics(1, 2024);

      const expectedMinutes = (100 + 150) * 2;
      const expectedHours = Math.round(expectedMinutes / 60);

      expect(result).toEqual({
        numberOfBooksRead: 3,
        hoursRead: expectedHours,
      });
    });
  });

  describe('searchGoogleBooks', () => {
    it('should return formatted books from Google API', async () => {
      const apiResponse = {
        data: {
          items: [
            {
              id: '1',
              volumeInfo: {
                title: 'Book Title',
                authors: ['Author'],
                publishedDate: '2020-01-01',
                infoLink: 'http://link.com',
                categories: ['Fiction'],
                imageLinks: { thumbnail: 'image.jpg' },
                description: 'desc',
                pageCount: 123,
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(apiResponse);

      const result = await service.searchGoogleBooks('test');

      expect(result[0].title).toEqual('Book Title');
      expect(result[0].authors).toEqual(['Author']);
      expect(result[0].publishedDate).toEqual('2020-01-01');
    });

    it('should throw error if request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API failure'));

      await expect(service.searchGoogleBooks('test')).rejects.toThrow(
        'Failed to fetch data from Google Books API: Error: API failure',
      );
    });
  });
});
