import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUsernameException extends HttpException {
  constructor(username: string) {
    super(
      `User with username: ${username} already exists.`,
      HttpStatus.CONFLICT,
    );
  }
}

export class DuplicateEmailException extends HttpException {
  constructor(email: string) {
    super(`User with email: ${email} already exists.`, HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(prop: string | number) {
    super(`User with: '${prop}' not found.`, HttpStatus.NOT_FOUND);
  }
}

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Wrong password provided', HttpStatus.UNAUTHORIZED);
  }
}
export class PasswordNotMatchException extends HttpException {
  constructor() {
    super('Confirm password is not equal to password', HttpStatus.BAD_REQUEST);
  }
}

export class FutureDateError extends HttpException {
  constructor() {
    super('Date cannot be in the future', HttpStatus.BAD_REQUEST);
  }
}

export class BookNotFoundException extends HttpException {
  constructor(prop: number | string) {
    super(`Book with id: '${prop}' not found.`, HttpStatus.NOT_FOUND);
  }
}

export class WrongUserAccessException extends HttpException {
  constructor(userId: number, postId: number) {
    super(
      `User with id: '${userId}' cannot interact post with id: ${postId}. Wrong access.`,
      HttpStatus.FORBIDDEN,
    );
  }
}
export class UserBookNotFoundError extends HttpException {
  constructor(userId: number, prop: number | string) {
    super(
      `User with id: ${userId} does not own book with id: '${prop}'.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
export class GoogleBooksApiError extends HttpException {
  constructor() {
    super(
      `Failed to fetch data from Google Books API `,
      HttpStatus.BAD_GATEWAY,
    );
  }
}
export class DuplicateBookException extends HttpException {
  constructor() {
    super(`User is already reading this book.`, HttpStatus.CONFLICT);
  }
}
